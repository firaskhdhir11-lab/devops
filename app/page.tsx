
"use client";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const skills = [
    "Linux", "Git & GitHub", "Docker", "Jenkins",
    "Kubernetes", "Ansible", "Terraform", "AWS",
    "CI/CD", "Networking"
  ];

  const projects = [
    {
      title: "DevSecOps Portfolio",
      description:
        "Portfolio professionnel développé avec Next.js et préparé pour une intégration CI/CD avec Jenkins.",
      tech: "Next.js · JavaScript · CSS · Jenkins"
    },
    {
      title: "Kubernetes Two-Tier Application",
      description:
        "Déploiement d'une application web à deux niveaux avec Kubernetes et services.",
      tech: "Kubernetes · YAML · Linux"
    },
    {
      title: "Network Access Control",
      description:
        "Projet NAC pour contrôler les accès réseau avec PacketFence, 802.1X et RADIUS.",
      tech: "PacketFence · RADIUS · VLAN · Active Directory"
    }
  ];

  return (
    <main>
      <Header />

      <section className="hero">
        <p className="eyebrow">DEVSECOPS & CLOUD COMPUTING</p>
        <h1>Hi, I'm <span>Firas Khdhir.</span></h1>
        <h2>Building, automating and securing applications.</h2>
        <p className="hero-description">
          Étudiant en Mastère DevOps & Cloud Computing, passionné par
          Linux, les réseaux, la conteneurisation et l'automatisation.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">Voir mes projets</a>
          <a className="button secondary" href="#contact">Me contacter</a>
        </div>
      </section>

      <About />

      <Skills />

      <Projects />

      <section className="section" id="experience">
        <p className="eyebrow">MY JOURNEY</p>
        <h2>Experience</h2>
        <div className="timeline">
          <article>
            <h3>PFE — CPG Gafsa</h3>
            <p>Étude et mise en place d'une solution Network Access Control avec PacketFence.</p>
          </article>
          <article>
            <h3>Tunisie Telecom</h3>
            <p>Stage professionnel — 2025/2026.</p>
          </article>
          <article>
            <h3>Aéroport Tozeur–Nafta</h3>
            <p>Stage professionnel — 2024/2025.</p>
          </article>
        </div>
      </section>

      <Contact />

      <Footer />
    </main>
  );
}
