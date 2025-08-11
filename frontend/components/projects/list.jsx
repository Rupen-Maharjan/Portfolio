import React from "react";
import ProjectCard from "./cardd";

const ProjectList = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((proj) => (
        <ProjectCard key={proj.title} project={proj} />
      ))}
    </div>
  );
};

export default ProjectList;
