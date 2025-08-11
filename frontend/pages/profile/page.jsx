import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileImage, BasicInfo, ProfileContact, AboutEducation } from '../../components/export';
import { motion } from 'framer-motion';

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => setData(res.data));
  }, []);

  const handleUpdate = async (updated) => {
    const res = await axios.put('/api/profile', updated);
    setData(res.data);
  };

  if (!data)
    return (
      <div className="text-gray-200 p-10 bg-[#0d1117] min-h-screen pt-20">
        Loading...
      </div>
    );

  return (
    <motion.div
      className="min-h-screen bg-[#0d1117] text-gray-200 p-8 pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        <span className="text-blue-500">👤</span> Personal Information
      </h1>
      <p className="text-gray-400 mb-8">
        Manage your personal details and contact information
      </p>

      <div className="space-y-10">
        <ProfileImage image={data.image} onUpdate={handleUpdate} />
        <BasicInfo data={data} onUpdate={handleUpdate} />
        <ProfileContact data={data} onUpdate={handleUpdate} />
        <AboutEducation data={data} onUpdate={handleUpdate} />
      </div>
    </motion.div>
  );
};

export default Profile;
