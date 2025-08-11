import { ChevronDown, ChevronUp } from 'lucide-react';

const SectionHeader = ({ title, skillsCount, average, isOpen, toggle }) => (
  <button onClick={toggle} className="w-full flex justify-between items-center mb-4 text-left">
    <div className="font-semibold text-lg">
      {title} <span className="text-sm text-blue-400">{skillsCount} skills</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span>Average</span>
      <span className="text-blue-400 font-bold">{average}%</span>
      <span className="text-xs ml-1">Advanced</span>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </div>
  </button>
);

export default SectionHeader;
