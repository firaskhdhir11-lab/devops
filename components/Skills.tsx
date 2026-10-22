
"use client";

import { useEffect, useState } from "react";
import { skills as fallbackSkills } from "@/data/skills";

export default function Skills() {
  const [skills, setSkills] = useState<string[]>(fallbackSkills);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

    fetch(`${apiUrl}/api/skills`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data: string[]) => setSkills(data))
      .catch((error) => {
        console.error("Unable to load skills from API:", error);
      });
  }, []);

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

