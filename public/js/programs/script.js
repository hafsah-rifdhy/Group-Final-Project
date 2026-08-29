// ---------- Programs / Services / Projects data ----------
const projects = [
  {
    title: "Portfolio Site Builder",
    category: "web",
    categoryLabel: "Web Development",
    icon: "🌐",
    description: "A guided program where students design and ship a fully responsive personal portfolio, deployed live with a custom domain.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#"
  },
  {
    title: "Campus Events App",
    category: "app",
    categoryLabel: "App Development",
    icon: "📱",
    description: "Cross-platform mobile app project covering booking flows, push notifications, and offline-first data sync.",
    tech: ["React Native", "Firebase"],
    link: "#"
  },
  {
    title: "Smart Attendance (AI)",
    category: "ai",
    categoryLabel: "AI / ML",
    icon: "🤖",
    description: "Face-recognition attendance service built end-to-end, from model training to a lightweight inference API.",
    tech: ["Python", "OpenCV", "FastAPI"],
    link: "#"
  },
  {
    title: "CI/CD Pipeline Lab",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: "☁️",
    description: "Hands-on service where students containerize an app and ship automated deploys to the cloud with zero downtime.",
    tech: ["Docker", "GitHub Actions", "AWS"],
    link: "#"
  },
  {
    title: "SpireX Design System",
    category: "design",
    categoryLabel: "UI / UX",
    icon: "🎨",
    description: "A component and token library project — from wireframes to a documented, reusable design system.",
    tech: ["Figma", "Storybook"],
    link: "#"
  },
  {
    title: "E-commerce Storefront",
    category: "web",
    categoryLabel: "Web Development",
    icon: "🛒",
    description: "Full storefront build with product catalog, cart, and checkout — the flagship web development capstone.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Fitness Tracker App",
    category: "app",
    categoryLabel: "App Development",
    icon: "🏃",
    description: "Native mobile project focused on wearable sensor data, charts, and daily goal streaks.",
    tech: ["Flutter", "SQLite"],
    link: "#"
  },
  {
    title: "Resume Screener (AI)",
    category: "ai",
    categoryLabel: "AI / ML",
    icon: "🧠",
    description: "NLP-powered service that scores resumes against a job description and explains its reasoning.",
    tech: ["Python", "spaCy", "Flask"],
    link: "#"
  }
];

const grid = document.getElementById("cardGrid");
const filterBar = document.getElementById("filterBar");

function renderCards(filter){
  const list = filter === "all" ? projects : projects.filter(p => p.category === filter);
  grid.innerHTML = "";

  if(list.length === 0){
    grid.innerHTML = `<div class="empty-state">No programs in this track yet — check back soon.</div>`;
    return;
  }

  list.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${p.icon}</div>
        <span class="card-category">${p.categoryLabel}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tech-tags">
        ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <a class="card-link" href="${p.link}">View project <span aria-hidden="true">→</span></a>
    `;
    grid.appendChild(card);
  });
}

filterBar.addEventListener("click", (e) => {
  const chip = e.target.closest(".filter-chip");
  if(!chip) return;

  filterBar.querySelectorAll(".filter-chip").forEach(c => {
    c.classList.remove("is-active");
    c.setAttribute("aria-selected", "false");
  });
  chip.classList.add("is-active");
  chip.setAttribute("aria-selected", "true");

  renderCards(chip.dataset.filter);
});

renderCards("all");

// ---------- mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});