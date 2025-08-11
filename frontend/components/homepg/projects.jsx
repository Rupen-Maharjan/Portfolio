import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Reusable Card component
const TiltCard = ({ imageUrl }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 300], [-15, 15]);

  const handleMouseMove = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative aspect-[9/13] w-80 overflow-hidden bg-zinc-950 shadow-2xl shadow-zinc-950 rounded-xl"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        rotateX,
        rotateY,
      }}
      initial={{ rotateX: 15, rotateY: -15, opacity: 0 }}
      animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-zinc-300/50 via-zinc-300 to-zinc-300/50 pointer-events-none"
        style={{ opacity: 0.1 }}
      />
    </motion.div>
  );
};

const Project = () => {
  const images = [
    "https://images.unsplash.com/photo-1669287731413-bfd7ce1fcc9e?q=80&w=800",
    "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?q=80&w=800",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight whitespace-nowrap mb-12">
        Projects
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center"
        style={{ perspective: "1500px" }}
      >
        {images.map((url, index) => (
          <TiltCard key={index} imageUrl={url} />
        ))}
      </div>
    </div>
  );
};

export default Project;
