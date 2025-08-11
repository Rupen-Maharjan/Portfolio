import { useEffect, useState } from 'react';
import { SkillSection, SkillForm } from '../../components/export';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error('Invalid data format:', res.data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to fetch skills:', err);
      setCategories([]);
    }
  };

  const handleSubmit = async ({ category, skill, level }) => {
    try {
      await axios.post('/api/skills', {
        category,
        skill: { name: skill, level },
      });
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const totalSkills = Array.isArray(categories)
    ? categories.reduce((acc, c) => acc + (c.skills?.length || 0), 0)
    : 0;

  return (
    <div className="pt-24 px-4 pb-10 bg-[#0b1120] min-h-screen text-white relative">
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Tech Stack</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
        >
          Add Skill
        </button>
      </motion.div>

      <motion.p
        className="text-gray-400 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Master your craft • {totalSkills} skills tracked
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-6"
      >
        {Array.isArray(categories) &&
          categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SkillSection
                title={cat.category}
                skills={cat.skills || []}
                average={
                  cat.skills && cat.skills.length > 0
                    ? Math.round(
                        cat.skills.reduce((sum, s) => sum + (s.level || 0), 0) /
                          cat.skills.length
                      )
                    : 0
                }
                onChange={fetchSkills}
              />
            </motion.div>
          ))}
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <SkillForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;