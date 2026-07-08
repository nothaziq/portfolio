// ============================================================
// Central content store. Add new projects / timeline items /
// skills here — the layout adapts automatically.
// ============================================================

import cinematchImg from "../assets/projects/cinematch.webp";
import gamedeckImg from "../assets/projects/gamedeck.webp";
import bachatImg from "../assets/projects/bachat.webp";

export const PROFILE = {
  name: "Muhammad Haziq",
  role: "AI & Software Engineer in the making",
  university: "Air University, Islamabad",
  degree: "BS Software Engineering",
  location: "Rawalpindi, Pakistan",
  email: "muhammadhaziq503123@gmail.com",
  github: "https://github.com/nothaziq",
  linkedin: "https://www.linkedin.com/in/muhammad-haziq-shahid",
  headline: "Building Intelligent Software Experiences.",
  blurb:
    "Second-year Software Engineering student who builds where machine learning meets real interfaces — training models by day, shipping React by night.",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Assistant", href: "#assistant" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 2, suffix: "+", label: "Years writing code" },
  { value: 6, suffix: "", label: "Shipped projects" },
  { value: 94, suffix: "%", label: "Recommender accuracy" },
  { value: 12, suffix: "+", label: "Tools & frameworks" },
];

export const PROJECTS = [
  {
    id: "cinematch",
    title: "CineMatch",
    year: "2026",
    tagline: "Every film, one thread at a time.",
    description:
      "A production-grade movie recommendation system built on the MovieLens 32M dataset. A content-based ML pipeline (TF-IDF + cosine similarity via Scikit-Learn) powers an 11-endpoint FastAPI backend built with clean architecture, paired with a React 19 frontend and a custom design system, plus live TMDB integration for posters, cast, and metadata.",
    stack: ["FastAPI", "React 19", "Python", "Scikit-Learn", "TMDB API", "Clean Architecture"],
    highlights: [
      "Offline ML pipeline trained on MovieLens 32M (32 million ratings)",
      "11-endpoint REST API with disk-cached, rate-limited TMDB integration",
      "Custom React 19 design system, built as a real deployable product",
    ],
    github: "https://github.com/nothaziq/CineMatch",
    demo: "https://cine-match.up.railway.app/",
    image: cinematchImg,
    accent: "primary",
  },
  {
    id: "gamedeck",
    title: "GameDeck Explorer",
    year: "2026",
    tagline: "A personal space to browse and curate your game library.",
    description:
      "A game discovery and library dashboard with a cinematic, backdrop-driven interface — adjustable blur and overlay controls, a scrollable trending rail, and tag-based browsing built for the way people actually skim through a game catalog.",
    stack: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    highlights: [
      "Live blur/overlay controls over full-bleed game backdrops",
      "Tag-based browsing (Steam-style tags: Story Rich, Great Soundtrack, etc.)",
      "Built and deployed end to end — live on Vercel",
    ],
    github: "https://github.com/mudasarmajeed5/gamedeck-explorer",
    demo: "https://gamedeck-explorer.vercel.app/",
    image: gamedeckImg,
    accent: "accent",
  },
  {
    id: "bachat",
    title: "Bachat — Price Tracker",
    year: "2026",
    tagline: "Watches Pakistani fashion retailers so you don't have to.",
    description:
      "A Next.js price-tracking app that monitors prices across Shopify-based Pakistani fashion stores — Outfitters, Breakout, Sana Safinaz, and Saya — and notifies users by email and web push the moment a watched item hits their target price. Built around four core patterns: a Singleton MongoDB connection, a Strategy-based fetcher per store, a Factory for notification channels, and a Repository layer abstracting all data access.",
    stack: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Web Push", "Vercel Cron"],
    highlights: [
      "Strategy pattern fetchers for 4 Shopify-based retailers, built to extend",
      "Daily cron job checks prices and queues email + push notifications",
      "Full repository layer with price history snapshots per product",
    ],
    github: "https://github.com/mudasarmajeed5/price-watch",
    demo: "#",
    image: bachatImg,
    imageFit: "contain",
    accent: "secondary",
  },
];

export const SKILL_NODES = [
  { id: "python", label: "Python", group: "language", weight: 0.92 },
  { id: "cpp", label: "C++", group: "language", weight: 0.85 },
  { id: "js", label: "JavaScript", group: "language", weight: 0.8 },
  { id: "sql", label: "SQL", group: "language", weight: 0.7 },

  { id: "react", label: "React", group: "frontend", weight: 0.85 },
  { id: "html", label: "HTML", group: "frontend", weight: 0.9 },
  { id: "css", label: "CSS", group: "frontend", weight: 0.85 },
  { id: "tailwind", label: "Tailwind", group: "frontend", weight: 0.8 },

  { id: "node", label: "Node.js", group: "backend", weight: 0.65 },
  { id: "express", label: "Express", group: "backend", weight: 0.6 },
  { id: "fastapi", label: "FastAPI", group: "backend", weight: 0.85 },

  { id: "nextjs", label: "Next.js", group: "frontend", weight: 0.75 },

  { id: "sklearn", label: "Scikit-Learn", group: "ai", weight: 0.85 },
  { id: "pandas", label: "Pandas", group: "ai", weight: 0.85 },
  { id: "numpy", label: "NumPy", group: "ai", weight: 0.8 },
  { id: "plotly", label: "Plotly", group: "ai", weight: 0.7 },

  { id: "mysql", label: "MySQL", group: "data", weight: 0.65 },

  { id: "git", label: "Git", group: "tools", weight: 0.9 },
  { id: "github", label: "GitHub", group: "tools", weight: 0.9 },
  { id: "vscode", label: "VS Code", group: "tools", weight: 0.9 },
  { id: "streamlit", label: "Streamlit", group: "tools", weight: 0.6 },

  { id: "tmdb", label: "TMDB API", group: "backend", weight: 0.6 },
];

export const SKILL_GROUPS = {
  language: { label: "Languages", color: "var(--color-primary-soft)" },
  frontend: { label: "Frontend", color: "var(--color-accent)" },
  backend: { label: "Backend", color: "#22c55e" },
  ai: { label: "AI / ML", color: "#f472b6" },
  data: { label: "Database", color: "#facc15" },
  tools: { label: "Tools", color: "#94a3b8" },
};

export const LEARNING_NOW = [
  "Deep Learning",
  "LLM Applications",
  "Software Architecture",
  "Advanced React",
];

export const JOURNEY = [
  {
    year: "2024",
    title: "Started BS Software Engineering",
    org: "Air University, Islamabad",
    description:
      "Foundations across programming, discrete structures, and calculus. First real exposure to OOP thinking.",
    type: "education",
  },
  {
    year: "2025",
    title: "Went deep on AI/ML fundamentals",
    org: "Self-directed + coursework",
    description:
      "Pandas, NumPy, and Scikit-Learn stopped being buzzwords. Built the movie recommender as a proof of concept.",
    type: "milestone",
  },
  {
    year: "2025",
    title: "Full-stack architecture, for real this time",
    org: "Personal project",
    description:
      "Took design patterns out of theory and into production: Singleton, Strategy, Factory, and Repository, all wired together in Bachat, a Next.js price tracker for Pakistani retailers.",
    type: "project",
  },
  {
    year: "2026",
    title: "Shipped CineMatch end to end",
    org: "Personal project",
    description:
      "Rebuilt the movie recommender from the ground up as a production-grade product: a 32M-rating ML pipeline behind an 11-endpoint FastAPI backend, deployed with a custom React 19 frontend.",
    type: "milestone",
  },
  {
    year: "2026",
    title: "Software design, HCI & requirements engineering",
    org: "Air University, current semester",
    description:
      "Running SRE, HCI, Software Design & Architecture, and Computer Organization concurrently — from UML diagrams to heuristic evaluations to x86 assembly.",
    type: "current",
  },
  {
    year: "Next",
    title: "LLM-powered products & advanced systems",
    org: "Roadmap",
    description:
      "Pushing from ML fundamentals into applied LLM engineering, while sharpening software architecture for larger systems.",
    type: "future",
  },
];

export const ACHIEVEMENTS = [
  { value: 6, suffix: "", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Technologies used" },
  { value: 5, suffix: "", label: "Courses this semester" },
  { value: 94, suffix: "%", label: "Best model accuracy" },
];

export const AI_ASSISTANT_QA = [
  {
    q: "Who is Haziq?",
    keywords: ["who", "haziq", "about"],
    a: "Muhammad Haziq is a second-year BS Software Engineering student at Air University, Islamabad, building toward a career as an AI/Software Engineer. He works across AI/ML, full-stack development, and UI/UX — usually all three on the same project.",
  },
  {
    q: "What technologies does he know?",
    keywords: ["technologies", "tech", "stack", "skills", "know", "language"],
    a: "Python, C++, JavaScript and SQL on the language side; React, Tailwind and vanilla HTML/CSS on the frontend; Node/Express on the backend; and Scikit-Learn, Pandas, NumPy and Plotly for AI/ML work. Currently deepening Deep Learning and LLM application development.",
  },
  {
    q: "Tell me about his projects.",
    keywords: ["project", "projects", "built", "work", "portfolio"],
    a: "Three flagship builds: CineMatch, a production-grade movie recommender with an ML pipeline trained on 32 million MovieLens ratings and a full FastAPI + React 19 stack; GameDeck Explorer, a cinematic game-discovery dashboard with live backdrop controls; and Bachat, a Next.js price tracker for Pakistani retailers built around Strategy, Factory, Singleton, and Repository patterns.",
  },
  {
    q: "Why should I hire him?",
    keywords: ["hire", "why", "recruit", "should"],
    a: "Because he doesn't stop at 'it works' — he pairs ML/engineering fundamentals with real attention to UX and requirements discipline, and ships end-to-end: from SRS docs and Jira sprints to trained models and polished interfaces.",
  },
  {
    q: "What is he currently learning?",
    keywords: ["learning", "currently", "studying", "now"],
    a: "Deep Learning, LLM application development, software architecture patterns, and advanced React — while juggling coursework in Software Requirements Engineering, HCI, Computer Organization & Assembly, and Software Design & Architecture.",
  },
  {
    q: "How can I contact him?",
    keywords: ["contact", "email", "reach", "linkedin"],
    a: "Use the contact form below, or reach out directly via email or LinkedIn — links are in the footer and the contact section.",
  },
];

export const AI_ASSISTANT_FALLBACK =
  "I only know Haziq-related things for now — try asking who he is, what he's built, his tech stack, or why you should hire him.";

export const AI_ASSISTANT_SUGGESTIONS = [
  "Who is Haziq?",
  "What technologies does he know?",
  "Tell me about his projects.",
  "Why should I hire him?",
];
