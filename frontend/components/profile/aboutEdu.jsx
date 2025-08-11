import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AboutEducation = ({ data, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(data);

  const handleSave = () => {
    onUpdate(form);
    setEdit(false);
  };

  return (
    <motion.div className="bg-[#1a2233] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">📅 About & Education</h2>
        <button onClick={() => setEdit(!edit)} className="text-sm text-blue-400">
          {edit ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Bio</label>
          {edit ? (
            <textarea
              value={form.bio || ''}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="bg-[#101825] border border-gray-600 p-1 w-full rounded text-white"
            />
          ) : (
            <p className="text-white">{data.bio}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-gray-400">Education</label>
          {edit ? (
            <textarea
              value={form.education || ''}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              className="bg-[#101825] border border-gray-600 p-1 w-full rounded text-white"
            />
          ) : (
            <p className="text-white">{data.education}</p>
          )}
        </div>
      </div>
      {edit && (
        <button onClick={handleSave} className="mt-4 bg-blue-600 px-4 py-1 rounded text-white">
          Save
        </button>
      )}
    </motion.div>
  );
};

export default AboutEducation;
