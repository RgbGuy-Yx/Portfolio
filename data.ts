export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  github: string;
  year: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level 1-5
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "05",
    title: "VAULT",
    subtitle: "Private Real-Time Chat Room",
    description: "A temporary, link-based chat app where rooms self-destruct after a short lifespan or on demand.",
    longDescription: "Vault is a real-time private chat application where users can create a room, share a link, and communicate instantly without accounts. Every room is temporary and self-destructs after 10 minutes or can be destroyed instantly.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js", "WebSocket", "Upstash Redis", "TypeScript", "PostCSS"],
    link: "https://github.com/RgbGuy-Yx/Vault",
    github: "https://github.com/RgbGuy-Yx/Vault",
    year: "2026"
  },
  {
    id: "06",
    title: "ORION",
    subtitle: "Voice-First Desktop Assistant",
    description: "A realtime, voice-first assistant that combines low-latency speech, LLM reasoning, and MCP-powered desktop actions.",
    longDescription: "ORION is a realtime, voice-first desktop assistant inspired by Tony Stark-style AI systems. It combines a low-latency voice pipeline with an MCP tool backend so the assistant can talk and also perform visible desktop actions during demos.",
    tags: ["Python 3.11+", "LiveKit Agents", "FastMCP", "Sarvam Saaras v3", "Groq", "Sarvam Bulbul v2", "httpx", "python-dotenv", "uv"],
    link: "https://github.com/RgbGuy-Yx/Orionn",
    github: "https://github.com/RgbGuy-Yx/Orionn",
    year: "2026",
    image: "/src/assets/images/Orion.jpeg"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Architecture",
    skills: [
      { name: "React 19", level: 5 },
      { name: "Next.js (Latest)", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "JavaScript (ES6+)", level: 5 },
      { name: "HTML5 & CSS3", level: 5 },
      { name: "Tailwind CSS v4", level: 5 }
    ]
  },
  {
    title: "Backend & Cloud Services",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Express.js", level: 5 },
      { name: "Supabase", level: 4 },
      { name: "Firebase", level: 4 },
      { name: "RESTful & GraphQL APIs", level: 5 }
    ]
  },
  {
    title: "Databases & Infrastructure",
    skills: [
      { name: "PostgreSQL", level: 5 },
      { name: "MongoDB", level: 4 },
      { name: "Vector Databases", level: 4 },
      { name: "Docker & Containers", level: 4 }
    ]
  },
  {
    title: "AI & Agentic Systems",
    skills: [
      { name: "Python", level: 5 },
      { name: "LangChain", level: 5 },
      { name: "LangGraph", level: 5 },
      { name: "AI Agent Architectures", level: 4 },
      { name: "n8n Workflow Automation", level: 5 }
    ]
  },
  {
    title: "AI IDEs & Workflows",
    skills: [
      { name: "Cursor", level: 5 },
      { name: "Claude Code", level: 5 },
      { name: "Antigravity 2.0", level: 5 },
      { name: "Antigravity CLI", level: 5 },
      { name: "GitHub Copilot", level: 5 }
    ]
  },
  {
    title: "Mobile & Pipelines",
    skills: [
      { name: "React Native", level: 5 },
      { name: "Git & GitHub CI/CD", level: 5 },
      { name: "Cloud Deployment", level: 5 },
      { name: "System Architecture", level: 4 }
    ]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "edu-4",
    year: "June 2026 — Present",
    title: "SSOC Contributor",
    institution: "SSOC",
    description: "Contributing to SSOC through collaborative open-source work, with a focus on consistent delivery and meaningful community impact.",
    tags: ["Open Source", "Community", "Contribution"]
  },
  {
    id: "edu-1",
    year: "October 2025",
    title: "Internship: Junior Marketing Manager",
    institution: "AIESEC in Hyderabad",
    description: "Completed an internship as Junior Marketing Manager at AIESEC in Hyderabad, supporting outreach and campaign execution.",
    tags: ["Marketing", "Internship", "AIESEC"]
  },
  {
    id: "edu-2",
    year: "September 2025",
    title: "SIH Grand Finalist",
    institution: "Smart India Hackathon",
    description: "Reached the grand finale stage of SIH 2025, recognizing strong problem-solving, teamwork, and execution under pressure.",
    tags: ["SIH", "Finalist", "Teamwork"]
  }
];
