import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import axios from "axios";
import { ProjectList } from "../../components/export";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/projects");
        setProjects(res.data);
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="text-zinc-400">
              Showcase your amazing work • {filteredProjects.length} total projects
            </p>
          </div>

          <div className="relative flex items-center gap-4">
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 rounded bg-zinc-800 text-white text-sm"
            />
            <button className="px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700">
              <ListFilter size={16} className="text-white" />
            </button>
          </div>

          {loading ? (
            <p className="text-zinc-400">Loading projects...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ProjectList projects={filteredProjects} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
