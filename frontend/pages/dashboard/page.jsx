import { motion } from 'framer-motion';
import { Folder, Code2, Eye, Activity, User, Plus } from 'lucide-react';
import { StatsCard, QuickActions, ActivityItem } from '../../components/export';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={sectionVariants}>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your portfolio.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <StatsCard icon={<Folder className="w-8 h-8 text-blue-400" />} value="12" title="Total Projects" change="+2 this month" changeType="increase" />
        <StatsCard icon={<Code2 className="w-8 h-8 text-green-400" />} value="24" title="Tech Skills" change="+3 this week" changeType="increase" />
        <StatsCard icon={<Eye className="w-8 h-8 text-purple-400" />} value="1.2k" title="Profile Views" change="+15% this month" changeType="increase" />
        <StatsCard icon={<Activity className="w-8 h-8 text-red-400" />} value="Today" title="Last Updated" change="2 hours ago" changeType="neutral" />
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="space-y-8" variants={sectionVariants}>
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Plus className="w-6 h-6 text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-100">Quick Actions</h2>
          </div>
          <p className="text-gray-400">Manage your portfolio content efficiently</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <QuickActions
            icon={<Folder className="w-8 h-8 text-blue-400" />}
            title="Add New Project"
            description="Create a showcase for your latest work"
            buttonText="Create Project"
            to="/admin/projects"
          />
          <QuickActions
            icon={<Code2 className="w-8 h-8 text-green-400" />}
            title="Update Skills"
            description="Add new technologies to your stack"
            buttonText="Manage Skills"
            to="/admin/skills"
          />
          <QuickActions
            icon={<User className="w-8 h-8 text-purple-400" />}
            title="Edit Profile"
            description="Update your personal information"
            buttonText="Edit Profile"
            to="/admin/profile"
          />
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div className="space-y-4" variants={sectionVariants}>
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-6 h-6 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-100">Recent Activity</h2>
        </div>

        <motion.div className="space-y-3" variants={containerVariants}>
          <ActivityItem color="bg-green-500" text="Updated React skill level" time="2 hours ago" />
          <ActivityItem color="bg-blue-500" text="Added Space Explorer project" time="1 day ago" />
          <ActivityItem color="bg-purple-500" text="Modified personal bio" time="3 days ago" />
          <ActivityItem color="bg-green-500" text="Updated MongoDB proficiency" time="1 week ago" />
        </motion.div>

        <div className="pt-4">
          <motion.button
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            View All Activity
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
