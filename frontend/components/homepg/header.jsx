import React from 'react'
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const header = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  return (
    <div className="max-w-[73%] text-center">
      <motion.h1
        className="text-5xl md:text-8xl font-bold font-poppins mb-5 tracking-tight"
        variants={item}
      >
        <span className="text-purple-400">Rupen</span>
        <br className="block md:hidden" />
        <span className="md:ml-2">Maharjan</span>
      </motion.h1>


      <motion.div
        className="flex items-center justify-center space-x-3 mb-10"
        variants={item}
      >
        <div className="h-[1px] w-8 bg-purple-500"></div>
        <p className="text-lg uppercase tracking-widest font-light">Developer & Security Specialist</p>
        <div className="h-[1px] w-8 bg-purple-500"></div>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed"
        variants={item}
      >
        Crafting digital experiences with MERN stack. Currently pursuing Ethical Hacking & Cyber Security at Softwarica College.
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row justify-center gap-5"
        variants={item}
      >
        <Link
          to="/contact"
          className="relative group 
             text-white 
             bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
             hover:bg-gradient-to-br 
             focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  
             px-8 py-3 
             rounded-full 
             overflow-hidden 
             transition-all duration-300 
             font-medium"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Get In Touch
          </span>
          <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
        </Link>

      </motion.div>
    </div>
  )
}

export default header