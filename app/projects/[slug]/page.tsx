
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="section">
      <p className="eyebrow">PROJECT DETAILS</p>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <h2>Technologies utilisées</h2>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <p>
        Ce projet fait partie de mon portfolio DevOps, Cloud et DevSecOps.
      </p>

      <Link href="/projects">← Retour aux projets</Link>
      {" | "}
      <Link href="/">Accueil</Link>
    </main>
  );
}

