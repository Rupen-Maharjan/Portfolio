import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Make sure react-router-dom is installed

const QuickActionCard = ({ icon, title, description, buttonText, to }) => (
  <motion.div className="bg-[#1a2233] p-6 rounded-lg">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>

    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        className="block w-full text-center py-3 rounded-lg bg-[#25314c] text-gray-300 hover:bg-[#303f63] transition-colors duration-300"
      >
        {buttonText}
      </Link>
    </motion.div>
  </motion.div>
);

export default QuickActionCard;
