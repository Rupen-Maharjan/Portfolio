import { motion } from 'framer-motion';

const SkillBar = ({ name, level, description }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-blue-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
        {name} • {level}% <span className="text-sm text-gray-400 ml-1">Advanced</span>
      </div>
    </div>
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
      <motion.div
        className="h-full bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8 }}
      />
    </div>
    <p className="text-sm text-gray-400 mt-1">{description}</p>
  </div>
);

export default SkillBar;
