import { Code2 } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-md flex flex-col">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover"
        />
        {project.featured && (
          <span className="absolute top-2 left-2 text-xs bg-black px-2 py-1 rounded-full text-white">
            ★ Featured
          </span>
        )}
        <span className="absolute top-2 right-2 text-xs bg-zinc-800 px-2 py-1 rounded-full text-white">
          {project.status}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-sm text-zinc-300">{project.description}</p>
        <div className="flex gap-2 flex-wrap">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-zinc-800 text-white rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-white text-black text-sm rounded">
              🌐 Live Demo
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-white text-black text-sm rounded">
              <Code2 size={14} /> Code
            </button>
          </div>
          <div className="flex gap-2">
            <button className="text-white hover:text-yellow-500">✎</button>
            <button className="text-white hover:text-red-500">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
