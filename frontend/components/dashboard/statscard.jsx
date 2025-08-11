import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';

const StatCard = ({ icon, title, value, change, changeType }) => {
  return (
    <motion.div
      className="bg-[#1a2233] p-6 rounded-lg relative flex flex-col justify-between"
      whileHover={{ scale: 1.03, backgroundColor: '#20293f' }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="flex justify-between items-start">
          {icon}
          <Expand className="w-5 h-5 text-gray-500" />
        </div>
        <h2 className="text-4xl font-bold text-gray-100 mt-4">{value}</h2>
        <p className="text-gray-400 mt-1">{title}</p>
      </div>
      <p className={`text-sm mt-4 ${changeType === 'increase' ? 'text-green-400' : 'text-gray-400'}`}>
        {change}
      </p>
    </motion.div>
  );
};

export default StatCard;
