
import { projects } from "@/data/projects";

export default function Projects() {
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

