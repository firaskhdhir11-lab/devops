
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="section">
      <p className="eyebrow">MY WORK</p>
      <h1>Mes projets</h1>
      <p>Découvrez mes projets DevOps, Cloud et DevSecOps.</p>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link href={`/projects/${project.slug}`}>
              Voir les détails →
            </Link>
          </article>
        ))}
      </div>

      <Link href="/">← Retour à l'accueil</Link>
    </main>
  );
}

