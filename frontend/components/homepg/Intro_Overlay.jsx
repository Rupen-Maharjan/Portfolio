import { useState, useEffect } from "react";
import { motion } from "motion/react";

const greetings = [
  { id: "en", text: "Hello" },
  { id: "np", text: "नमस्ते" },
  { id: "cn", text: "你好" },
  { id: "jp", text: "こんにちは" },
  { id: "de", text: "Hallo" },
  { id: "es", text: "Hola" },
  { id: "fr", text: "Bonjour" },
  { id: "ru", text: "Привет" },
  { id: "ar", text: "مرحبا" },
  { id: "ko", text: "안녕하세요" },
  { id: "it", text: "Ciao" },
  { id: "pt", text: "Olá" },
  { id: "th", text: "สวัสดี" },
  { id: "tr", text: "Merhaba" }
];

const IntroOverlay = ({ onAnimationComplete }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [greetingComplete, setGreetingComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind lg breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (greetingComplete) return;

    if (currentGreeting >= greetings.length) {
      setGreetingComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentGreeting(prev => prev + 1);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentGreeting, greetingComplete]);

  // Radius levels
  const mobileRadii = ["0%", "10%", "20%", "30%"];
  const desktopRadii = ["0%", "20%", "50%", "70%"];

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-[#0f0f13] to-[#161622] z-50 flex items-center justify-center"
      initial={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      animate={
        greetingComplete
          ? {
              y: "-100%",
              borderBottomLeftRadius: isDesktop ? desktopRadii : mobileRadii,
              borderBottomRightRadius: isDesktop ? desktopRadii : mobileRadii,
              transition: {
                y: { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.3 },
                borderBottomLeftRadius: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.3
                },
                borderBottomRightRadius: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }
          : {}
      }
      onAnimationComplete={() => {
        if (greetingComplete) {
          onAnimationComplete?.();
        }
      }}
    >
      <div className="relative h-20 flex items-center justify-center">
        {currentGreeting < greetings.length && (
          <div
            key={greetings[currentGreeting].id}
            className="text-5xl md:text-7xl font-bold font-poppins text-center absolute"
          >
            {greetings[currentGreeting].text}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
