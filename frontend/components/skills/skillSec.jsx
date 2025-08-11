import { useState } from 'react';
import SectionHeader from './secHeader';
import SkillBar from './skillbar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const SkillSection = ({ title, skills, average, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleDelete = async (skillId) => {
    await axios.delete(`/api/skills/${title}/${skillId}`);
    onChange();
  };

  return (
    <div className="bg-[#0f0f0f] p-4 rounded-md border border-gray-800 mb-6">
      <SectionHeader
        title={title}
        skillsCount={skills.length}
        average={average}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {skills.map((skill) => (
              <div key={skill._id} className="relative group">
                <SkillBar {...skill} />
                <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-gray-400 hover:text-white">
                    <FaEdit size={14} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(skill._id)}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillSection;
