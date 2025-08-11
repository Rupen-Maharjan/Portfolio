import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ category: '', skill: '', level: '' });

  const handleSubmit = () => {
    if (formData.category && formData.skill) {
      onSubmit({ ...formData, level: Number(formData.level) || 0 });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#1a2233] p-6 rounded-lg w-full max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Add New Skill</h2>
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-sm">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mt-1 p-2 rounded bg-[#101825] text-white border border-gray-600"
              placeholder="e.g. Backend"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Skill</label>
            <input
              type="text"
              value={formData.skill}
              onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
              className="w-full mt-1 p-2 rounded bg-[#101825] text-white border border-gray-600"
              placeholder="e.g. Node.js"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Level (0–100)</label>
            <input
              type="text"
              pattern="[0-9]*"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full mt-1 p-2 rounded bg-[#101825] text-white border border-gray-600"
              placeholder="e.g. 75"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button onClick={onClose} className="text-sm text-gray-300 hover:text-white">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillForm;