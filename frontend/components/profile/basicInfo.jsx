import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BasicInfo = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    fullname: data.fullname || '',
    title: data.title || '',
    tagline: data.tagline || '',
    exp: data.exp || '',
    location: data.location || '',
    about: data.about || '',
    token: sessionStorage.getItem('token')
  });

  const textareaRef = useRef(null);

  // Auto-resize textarea when 'about' changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [form.about]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/basic', form);
      setEdit(false);
    } catch (err) {
      console.error('Error saving basic info:', err);
    }
  };

  return (
    <motion.div className="bg-[#1a2233] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Basic Information</h2>
        <button onClick={() => setEdit(!edit)} className="text-sm text-blue-400">
          {edit ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['fullname', 'title', 'tagline', 'exp', 'location'].map((field) => (
          <div key={field}>
            <label className="text-sm text-gray-400 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            {edit ? (
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="bg-[#101825] border border-gray-600 p-1 w-full rounded text-white"
              />
            ) : (
              <p className="text-white">{form[field]}</p>
            )}
          </div>
        ))}

        {/* About field special textarea */}
        <div>
          <label className="text-sm text-gray-400 capitalize">About</label>
          {edit ? (
            <textarea
              ref={textareaRef}
              name="about"
              value={form.about}
              onChange={handleChange}
              className="bg-[#101825] border border-gray-600 p-1 w-full rounded text-white resize-none overflow-hidden"
              rows={1} // start with 1 row
              style={{ minHeight: "3rem" }} // optional minimum height
            />
          ) : (
            <p className="text-white whitespace-pre-wrap">{form.about}</p>
          )}
        </div>

        {edit && (
          <button
            type="submit"
            className="mt-4 bg-blue-600 px-4 py-1 rounded text-white col-span-full w-fit"
          >
            Save
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default BasicInfo;
