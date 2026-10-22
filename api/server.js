const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "DevSecOps Portfolio API is running"
  });
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "Firas Khdhir",
    title: "Étudiant en Master DevOps & Cloud",
    location: "Tozeur, Tunisie",
    specialization: "Réseaux Informatiques, DevOps & Cloud",
    languages: ["Arabe", "Français", "Anglais"]
  });
});

app.get("/api/projects", (req, res) => {
  res.json([
    {
      title: "DevSecOps Portfolio",
      description: "Portfolio personnel développé avec Next.js.",
      tags: ["Next.js", "TypeScript", "CSS"],
      slug: "devsecops-portfolio"
    },
    {
      title: "Kubernetes Two-Tier Application",
      description: "Déploiement d'une application web avec Kubernetes et k3s.",
      tags: ["Kubernetes", "Docker", "YAML"],
      slug: "kubernetes-two-tier"
    },
    {
      title: "NAC / PacketFence",
      description: "Mise en place d'une solution de contrôle d'accès réseau.",
      tags: ["PacketFence", "802.1X", "RADIUS"],
      slug: "nac-packetfence"
    }
  ]);
});

app.get("/api/skills", (req, res) => {
  res.json([
    "Linux",
    "Git / GitHub",
    "Docker",
    "Jenkins",
    "Kubernetes",
    "Ansible",
    "Terraform",
    "AWS",
    "CI/CD",
    "Networking"
  ]);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevSecOps Portfolio API running on port ${PORT}`);
});
