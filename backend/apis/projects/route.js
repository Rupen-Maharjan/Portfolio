// routes/projects.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const projects = [
    {
      title: "Space Explorer",
      description: "A 3D space exploration game...",
      image: "https://upload.wikimedia.org/...",
      tech: ["React", "Three.js", "WebGL", "Framer Motion"],
      status: "completed",
      featured: true,
    },
    {
      title: "E-commerce Dashboard",
      description: "Modern admin dashboard...",
      image: "https://miro.medium.com/...",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      status: "active",
      featured: false,
    },
  ];
  res.json(projects);
});

export default router;
