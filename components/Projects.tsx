
"use client";

import { useEffect, useState } from "react";
import { projects as fallbackProjects } from "@/data/projects";

type Project = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

    fetch(`${apiUrl}/api/projects`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data: Project[]) => setProjects(data))
      .catch((error) => {
        console.error("Unable to load projects from API:", error);
      });
  }, []);

  return (
    <section className="section" id="projects">
      <p className="eyebrow">MY WORK</p>
      <h2>Featured Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

