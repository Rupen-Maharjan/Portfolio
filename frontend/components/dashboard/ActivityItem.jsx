import { motion } from 'framer-motion';

const ActivityItem = ({ color, text, time }) => (
  <motion.div
    className="bg-[#1a2233] p-4 rounded-lg flex items-center space-x-4"
  >
    <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
    <div className="flex-grow">
      <p className="text-gray-200">{text}</p>
    </div>
    <p className="text-sm text-gray-500">{time}</p>
  </motion.div>
);

export default ActivityItem;
