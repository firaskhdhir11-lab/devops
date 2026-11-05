const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { z } = require("zod");
const { rateLimit } = require("express-rate-limit");

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  message: z.string().trim().min(10, "Message must contain at least 10 characters").max(2000)
}).strict();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact requests. Please try again later."
  }
});

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
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

app.post("/api/contact", contactLimiter, (req, res) => {
  const validation = contactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const { name, email, message } = validation.data;

  res.status(201).json({
    success: true,
    message: "Contact message received successfully",
    data: { name, email, message }
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});
// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: statusCode >= 500
      ? "Internal server error"
      : "Invalid request"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevSecOps Portfolio API running on port ${PORT}`);
});

