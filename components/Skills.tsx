
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <p className="eyebrow">MY EXPERTISE</p>
      <h2>DevOps & Cloud Skills</h2>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

