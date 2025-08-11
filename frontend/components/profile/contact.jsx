import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageCircle, Globe } from 'lucide-react';

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  discord: MessageCircle,
};

const ProfileContact = ({ data, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const defaultFields = ['discord', 'email', 'linkedin', 'github'];
  const initial = defaultFields.map((key) => [key, data[key] || '']);
  const [contacts, setContacts] = useState(initial);

  const handleChange = (index, key, value) => {
    const updated = [...contacts];
    updated[index] = [key, value];
    setContacts(updated);
  };

  const handleRemove = (index) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setContacts((prev) => [...prev, ['', '']]);
  };

  const handleSave = () => {
    const updatedData = Object.fromEntries(
      contacts.filter(([key]) => key.trim() !== '')
    );
    onUpdate(updatedData);
    setEdit(false);
  };

  return (
    <motion.div className="bg-[#1a2233] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">📧 Contact Information</h2>
        <button onClick={() => setEdit(!edit)} className="text-sm text-blue-400">
          {edit ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map(([key, value], index) => {
          const Icon = iconMap[key.toLowerCase()] || Globe;
          return (
            <div key={index} className="bg-[#101825] p-3 rounded border border-gray-600">
              {edit ? (
                <>
                  <label className="text-sm text-gray-400">Type</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleChange(index, e.target.value, value)}
                    className="bg-[#161b22] border border-gray-600 p-1 mb-2 w-full rounded text-white"
                    placeholder="e.g. facebook"
                  />
                  <label className="text-sm text-gray-400">Value</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                    className="bg-[#161b22] border border-gray-600 p-1 w-full rounded text-white"
                    placeholder="Link or value"
                  />
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-400 text-xs mt-1"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <div className="flex items-start gap-2">
                  <Icon size={18} className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm capitalize font-medium text-gray-200">{key}</p>
                    <p className="text-gray-300 break-all">{value}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {edit && (
        <div className="mt-4 space-x-4">
          <button onClick={handleAdd} className="text-sm text-green-400">
            + Add New
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-1 rounded text-sm text-white"
          >
            Save
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileContact;