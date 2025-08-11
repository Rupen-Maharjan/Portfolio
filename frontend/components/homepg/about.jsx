"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
  const loadProfileImage = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/img/profile');
      if (res.data && res.data.data) {
        // Remove old image from localStorage (optional but clean)
        localStorage.removeItem('profileImage');
        // Store new image URL
        localStorage.setItem('profileImage', res.data.data);
        // Update state with new image
        setProfileImage(res.data.data);
      } else {
        setProfileImage('/me.jpeg');
        localStorage.removeItem('profileImage');
      }
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
      setProfileImage('/me.jpeg');
      localStorage.removeItem('profileImage');
    }
  };

  loadProfileImage();
}, []);


  return (
    <section id="about" className="bg-[#141521] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-xl"
        >
          <img
            src={profileImage || "/me.jpeg"}
            alt="Rupen Maharjan"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-white"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            I'm <span className="text-white">Rupen Maharjan.</span>
          </motion.h2>

          <motion.h3
            variants={item}
            className="text-2xl md:text-3xl font-semibold text-accent mb-1"
          >
            A Developer
          </motion.h3>

          <motion.h4
            variants={item}
            className="text-xl md:text-2xl text-gray-400 mb-6"
          >
            Based in Nepal.
          </motion.h4>

          <motion.p
            variants={item}
            className="text-lg text-gray-300 mb-4"
          >
            I'm probably the most passionate developer you will ever get to work with.
            If you have a great project that needs some amazing skills, I'm your guy.
          </motion.p>

          <motion.p
            variants={item}
            className="text-lg text-gray-300 mb-6"
          >
            Currently pursuing a Bachelor's degree in Ethical Hacking & Cyber Security.
            Completed high school in Computer Science from People's Campus (2022).
          </motion.p>

          {/* Skills */}
          <motion.div variants={item} className="grid grid-cols-2 gap-10 text-gray-300 mb-10">
            <div>
              <h5 className="text-accent font-medium mb-2 text-lg">Frontend</h5>
              <ul className="space-y-1 text-base">
                <li>React.js</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div>
              <h5 className="text-accent font-medium mb-2 text-lg">Backend</h5>
              <ul className="space-y-1 text-base">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>Linux</li>
              </ul>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item}>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 group"
            >
              <span className="mr-2">Let's Talk</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
