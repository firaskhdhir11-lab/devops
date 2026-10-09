const devsecopsSkills = [
  { name: "Git",        desc: "Versionning du code, push via SSH" },
  { name: "Docker",     desc: "Conteneurisation et Docker Compose" },
  { name: "Jenkins",    desc: "Serveur CI/CD installé comme service" },
  { name: "Kubernetes", desc: "Déploiement d'une application 3-tiers" },
  { name: "Ansible",    desc: "Automatisation de configuration" },
  { name: "Terraform",  desc: "Infrastructure as Code" },
  { name: "Argo CD",    desc: "Déploiement continu GitOps" }
];

const projects = [
  { title: "Application 3-tiers Docker & Kubernetes",
    desc: "Déploiement du frontend, du backend et de la base de données sous Linux/Kubernetes." },
  { title: "NAC avec PacketFence (PFE)",
    desc: "Contrôle d'accès réseau avec 802.1X, RADIUS, VLAN et Active Directory." },
  { title: "DevSecOps Portfolio",
    desc: "Portfolio HTML/CSS/JS servi par Nginx dans un conteneur Docker." },
  { title: "Infrastructure CI/CD",
    desc: "VM Ubuntu Server avec Docker, Jenkins et Vagrant." }
];

function render(containerId, items, titleKey) {
  document.getElementById(containerId).innerHTML = items.map(i =>
    `<div class="card"><h3>${i[titleKey]}</h3><p>${i.desc}</p></div>`
  ).join("");
}

render("devsecops-grid", devsecopsSkills, "name");
render("projects-grid", projects, "title");
