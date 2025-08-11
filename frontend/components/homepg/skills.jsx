"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Skills = () => {
  return (
    <div className="bg-[#0e0f1a] w-full text-white font-sans">
      {/* Header with buttons */}
      <header className="flex h-32 items-center justify-center gap-6 px-4">
        <div className="flex items-center justify-between w-[80%]  gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight whitespace-nowrap">
            My Tech Stack 💻
          </h2>
          <CarouselButtons />
        </div>
      </header>

      {/* Carousel */}
      <HorizontalScrollCarousel />

    </div>
  );
};

// Carousel buttons component
const CarouselButtons = () => {
  const { scrollLeft, scrollRight, currentIndex, visibleCount, totalItems } =
    useCarouselController();

  const baseBtnStyles =
    "p-2 bg-black/50 hover:bg-black/70 transition-all text-white rounded-lg shadow-[0_0_8px_1px_rgba(180,100,255,0.4)]";

  return (
    <div className="flex items-center justify-between gap-2 w-20">
      <button
        onClick={scrollLeft}
        disabled={currentIndex === 0}
        className={` ${baseBtnStyles} ${
          currentIndex === 0 ? "opacity-30 cursor-default" : "cursor-pointer"
        }`}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={scrollRight}
        disabled={currentIndex >= totalItems - visibleCount}
        className={`${baseBtnStyles} ${
          currentIndex >= totalItems - visibleCount
            ? "opacity-30 cursor-default"
            : "cursor-pointer"
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

// Custom hook for sharing carousel state and controls
const useCarouselController = () => {
  const scrollLeft = () => {
    document.dispatchEvent(new CustomEvent("carousel-left"));
  };
  const scrollRight = () => {
    document.dispatchEvent(new CustomEvent("carousel-right"));
  };

  const [state, setState] = useState({
    currentIndex: 0,
    visibleCount: 1,
    totalItems: skillsData.length,
  });

  useEffect(() => {
    const handler = (e) => {
      if (e.detail) setState(e.detail);
    };
    document.addEventListener("carousel-update", handler);
    return () => document.removeEventListener("carousel-update", handler);
  }, []);

  return { ...state, scrollLeft, scrollRight };
};

// Carousel main component
const HorizontalScrollCarousel = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const controls = useAnimation();
  const [x, setX] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = skillsData.length;

  useEffect(() => {
    const resize = () => {
      if (contentRef.current) {
        const firstCard = contentRef.current.querySelector("div");
        if (firstCard && containerRef.current) {
          const width = firstCard.offsetWidth + 32;
          setItemWidth(width);
          const containerWidth = containerRef.current.offsetWidth;
          const count = Math.floor(containerWidth / width);
          setVisibleCount(count || 1);
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const scroll = async (direction) => {
    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > totalItems - visibleCount)
      newIndex = totalItems - visibleCount;

    setCurrentIndex(newIndex);
    const newX = -newIndex * itemWidth;
    setX(newX);
    await controls.start({
      x: newX,
      transition: { duration: 0.6, ease: "easeInOut" },
    });

    document.dispatchEvent(
      new CustomEvent("carousel-update", {
        detail: {
          currentIndex: newIndex,
          visibleCount,
          totalItems,
        },
      })
    );
  };

  useEffect(() => {
    const handleLeft = () => scroll("left");
    const handleRight = () => scroll("right");

    document.addEventListener("carousel-left", handleLeft);
    document.addEventListener("carousel-right", handleRight);

    return () => {
      document.removeEventListener("carousel-left", handleLeft);
      document.removeEventListener("carousel-right", handleRight);
    };
  });

  return (
    <section className="relative h-[100vh] bg-[#0e0f1a] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative w-[90%] overflow-hidden">
        <motion.div
          ref={contentRef}
          animate={controls}
          className="flex w-fit gap-8"
        >
          {skillsData.map((data, idx) => (
            <SkillCard key={idx} data={data} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Animated card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const SkillCard = ({ data, index }) => (
  <motion.div
    className="h-[450px] w-[400px] bg-gradient-to-br from-[#1f1f2e] to-[#2e2e3e]
               border border-purple-600/30 rounded-2xl p-6 shadow-xl hover:shadow-purple-900/30
               hover:scale-[1.03] transition-all duration-300 ease-in-out"
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    <h3 className="text-3xl font-bold text-accent mb-6 border-b border-accent/30 pb-2">
      {data.category}
    </h3>
    <ul className="grid grid-cols-2 gap-3">
      {data.skills.map((skill) => (
        <li
          key={skill}
          className="bg-[#292a3a] px-4 py-2 rounded-lg text-sm text-white text-center font-medium
                     hover:bg-accent hover:text-white transition-all duration-300 cursor-default"
        >
          {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default Skills;

const skillsData = [
  {
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JS",
      "React",
      "Tailwind",
      "Framer Motion",
      "SASS",
      "jQuery",
    ],
  },
  {
    category: "Backend",
    skills: ["Node", "Express", "Django", "Flask", "Rails"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis"],
  },
  {
    category: "Frameworks",
    skills: ["Next.js", "Angular", "Vue", "Svelte", "Nuxt"],
  },
  {
    category: "Dev Tools",
    skills: ["Git", "Docker", "Webpack", "Jenkins", "ESLint"],
  },
  {
    category: "Testing",
    skills: ["Jest", "Cypress", "Playwright", "Mocha"],
  },
  {
    category: "Cloud",
    skills: ["AWS", "GCP", "Azure", "Netlify", "Heroku"],
  },
  {
    category: "Languages",
    skills: ["TS", "Python", "Go", "Rust", "Java", "C++"],
  },
  {
    category: "Design",
    skills: ["Figma", "XD", "Canva", "Photoshop"],
  },
  {
    category: "Other",
    skills: ["GraphQL", "REST", "CI/CD", "OAuth"],
  },
];
