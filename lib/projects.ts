// lib/projects.ts

export type ProjectStatus =
  | "CURRENTLY BUILDING"
  | "PLANNING"
  | "LIVE"
  | "ARCHIVED";

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  featured?: boolean;
  coverImage: string;
  executiveSummary: string;
  details: string;
  tech: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
    hosting: string[];
    tools: string[];
  };
  skills: string[];
  architecture: {
    description: string;
    image?: string;
  };
  challenges: {
    problem: string;
    solution: string;
    tradeoff: string;
  }[];
  screenshots: string[];
  roadmap: {
    label: string;
    done: boolean;
  }[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "unfilteredlog",
    title: "UnfilteredLog",
    description: "Anonymous writing platform focused on honest conversations.",
    status: "CURRENTLY BUILDING",
    featured: true,
    coverImage: "",
    executiveSummary:
      "UnfilteredLog is a minimalist writing platform built around private, anonymous, and public logging.",
    details:
      "The project focuses on honest writing without likes, followers, or performative social mechanics.",
    tech: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Supabase", "PostgreSQL"],
      infrastructure: ["Supabase Auth", "Row Level Security"],
      hosting: ["Vercel"],
      tools: ["GitHub", "VS Code", "npm"],
    },
    skills: ["React", "TypeScript", "Product Design", "Database Planning"],
    architecture: {
      description:
        "Next.js frontend with Supabase planned for authentication, persistence, and row-level access control.",
    },
    challenges: [
      {
        problem: "Users need public, private, and anonymous writing modes.",
        solution: "Visibility is stored as a first-class project property.",
        tradeoff: "Backend authorization rules become more important.",
      },
    ],
    screenshots: [],
    roadmap: [
      { label: "MVP", done: true },
      { label: "Authentication", done: false },
      { label: "Supabase persistence", done: false },
    ],
    lessons: ["Privacy rules should be designed early."],
  },
  {
    slug: "partycatdrip",
    title: "Party Cat Drip",
    description: "Website redesign and modernization project.",
    status: "CURRENTLY BUILDING",
    coverImage: "",
    executiveSummary:
      "Party Cat Drip is a website recreation and redesign project focused on rebuilding an existing site with a maintainable modern frontend.",
    details:
      "The project converts a live website into reusable React components that can be locally redesigned and improved.",
    tech: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: [],
      infrastructure: [],
      hosting: ["Local Development", "Vercel"],
      tools: ["Chrome DevTools", "VS Code", "GitHub"],
    },
    skills: ["Frontend Recreation", "Responsive Design", "Tailwind CSS"],
    architecture: {
      description:
        "Static frontend implementation using reusable React components and project metadata.",
    },
    challenges: [
      {
        problem:
          "The original site needs to be recreated without messy copy-paste HTML.",
        solution: "Break the layout into clean reusable React sections.",
        tradeoff:
          "Requires more setup, but produces a better redesign foundation.",
      },
    ],
    screenshots: [],
    roadmap: [
      { label: "Initial recreation", done: true },
      { label: "Responsive cleanup", done: false },
      { label: "Final redesign", done: false },
    ],
    lessons: ["Component structure matters before visual polish."],
  },
  {
    slug: "discord-infrastructure",
    title: "Discord Infrastructure",
    description:
      "TypeScript Discord bot, Supabase backend, Railway hosting, and community automation.",
    status: "PLANNING",
    coverImage: "",
    executiveSummary:
      "Discord Infrastructure documents the engineering behind a production Discord ecosystem consisting of a TypeScript bot, Supabase backend, Railway hosting, and a Next.js administration portal. Rather than focusing on a single Discord server, the project is designed as a scalable platform for managing multiple communities from one central dashboard.",
    details:
      "The platform consists of a custom Discord bot built with discord.js running on Railway. The bot communicates with Supabase for persistent storage and integrates with a Next.js web application used for administration. Features include automated guild onboarding, slash commands, moderation utilities, role management, permission synchronization, server approval workflows, and centralized management of multiple Discord communities.",
    tech: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "discord.js", "Supabase", "PostgreSQL"],
      infrastructure: [
        "Railway",
        "Discord API",
        "Supabase Auth",
        "Row Level Security",
      ],
      hosting: ["Railway", "Vercel"],
      tools: ["GitHub", "VS Code", "npm", "tsx"],
    },
    skills: [
      "Discord API",
      "Bot Development",
      "TypeScript",
      "Node.js",
      "Supabase",
      "Database Design",
      "Authentication",
      "Automation",
      "Role-Based Access Control",
    ],
    architecture: {
      description:
        "Discord events and slash commands are handled by a Node.js TypeScript bot using discord.js. The bot runs on Railway, stores persistent data in Supabase/PostgreSQL, and supports a Next.js administrative dashboard for reviewing guilds, managing communities, and centralizing server operations.",
    },
    challenges: [
      {
        problem:
          "Managing multiple Discord communities manually creates duplicated moderation work, inconsistent permissions, and poor visibility across servers.",
        solution:
          "Build a Discord bot that listens for server events, registers slash commands, stores guild data in Supabase, and supports centralized approval and administration workflows.",
        tradeoff:
          "Centralizing community infrastructure improves control and visibility, but it requires careful permission design, secure environment variables, and reliable hosting.",
      },
      {
        problem:
          "Discord bots need to stay online continuously and handle events without depending on a local development machine.",
        solution:
          "Host the bot on Railway with a production startup command using tsx.",
        tradeoff:
          "Railway simplifies deployment, but production debugging requires cleaner logs and stricter environment management.",
      },
    ],
    screenshots: [],
    roadmap: [
      { label: "TypeScript bot foundation", done: true },
      { label: "Slash command registration", done: true },
      { label: "Supabase guild storage", done: true },
      { label: "Railway deployment", done: true },
      { label: "Admin dashboard", done: false },
      { label: "Advanced moderation workflows", done: false },
    ],
    lessons: [
      "Discord infrastructure is real backend engineering, not just server decoration.",
      "Bots become much more useful when connected to persistent storage.",
      "A hosted bot plus a database creates the foundation for scalable community operations.",
    ],
  },
  {
    slug: "printer-toolkit",
    title: "Printer Toolkit",
    description: "Enterprise printer management utilities.",
    status: "PLANNING",
    coverImage: "",
    executiveSummary:
      "Printer Toolkit is a planned utility set for enterprise printer fleet management, reporting, and troubleshooting.",
    details:
      "The goal is to document and eventually build practical tools for print infrastructure workflows.",
    tech: {
      frontend: ["Next.js", "React", "TypeScript"],
      backend: ["PowerShell", "APIs"],
      infrastructure: ["Windows Print Server", "SNMP", "HP Web JetAdmin"],
      hosting: ["Vercel"],
      tools: ["PowerShell", "Excel", "ServiceNow"],
    },
    skills: ["Print Infrastructure", "Automation", "Fleet Management"],
    architecture: {
      description:
        "Planned toolkit for collecting printer data, normalizing it, and presenting operational insights.",
    },
    challenges: [
      {
        problem: "Printer fleet data is usually scattered across tools.",
        solution: "Centralize useful fields into one workflow.",
        tradeoff: "Different vendors expose different data formats.",
      },
    ],
    screenshots: [],
    roadmap: [
      { label: "Requirements", done: false },
      { label: "Prototype", done: false },
      { label: "Reporting dashboard", done: false },
    ],
    lessons: ["Enterprise printer work is ugly, but extremely resume-relevant."],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}