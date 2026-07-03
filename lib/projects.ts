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
  "Party Cat Drip is a full-stack website modernization project focused on recreating an existing business website using a scalable React architecture. The objective is to replace a difficult-to-maintain legacy implementation with a modern, component-driven application that supports future enhancements, improved responsiveness, and simplified content management.",

details:
  "The project involved reverse engineering the production website, designing a reusable component architecture, and rebuilding the application from the ground up using Next.js and TypeScript. Rather than reproducing the original HTML structure, the application was organized into modular components, responsive layouts, and maintainable styling patterns. The project also established a modern development workflow using Git version control, automated deployments, and cloud hosting to provide a reliable foundation for future feature development.",

tech: {
  frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS"
  ],
  backend: [
    "Node.js",
    "Next.js API Routes"
  ],
  infrastructure: [
    "Vercel",
    "GitHub"
  ],
  hosting: [
    "Vercel"
  ],
  tools: [
    "Git",
    "npm",
    "Visual Studio Code",
    "Chrome DevTools"
  ]
},

skills: [
  "Frontend Architecture",
  "Component-Based Design",
  "Responsive Web Design",
  "TypeScript",
  "Reverse Engineering",
  "UI Modernization",
  "Git Version Control"
],

architecture: {
  description:
    "The application uses Next.js with a reusable component architecture, TypeScript for type safety, Tailwind CSS for responsive styling, and GitHub-backed version control with automated Vercel deployments. The modular design enables rapid iteration while maintaining consistency across the entire site.",
},

challenges: [
  {
    problem:
      "The original website was difficult to extend due to tightly coupled layouts and inconsistent styling.",
    solution:
      "Rebuilt the application using reusable React components, shared layouts, and centralized styling to create a maintainable codebase.",
    tradeoff:
      "The initial rebuild required significantly more engineering effort than copying the existing implementation, but resulted in a scalable architecture that simplifies future redesigns and feature additions.",
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
  "Printer Toolkit is a Windows desktop application built to streamline enterprise printer administration through centralized diagnostics, reporting, and management utilities. The project focuses on improving the efficiency of print administrators by consolidating common maintenance and troubleshooting tasks into a single interface.",

details:
  "Developed as a WPF desktop application in C#, Printer Toolkit was designed to simplify day-to-day management of enterprise print environments. The application provides utilities for printer discovery, status monitoring, reporting, and administrative workflows while reducing repetitive manual tasks performed across large printer fleets. The project emphasizes maintainability, responsive desktop performance, and a clean user experience tailored for IT administrators.",

tech: {
  frontend: ["WPF", "XAML"],
  backend: ["C#", ".NET"],
  infrastructure: [
    "Windows Print Spooler",
    "SNMP",
    "Enterprise Print Infrastructure"
  ],
  hosting: ["Git"],
  tools: [
    "Visual Studio",
    "NuGet",
    "Git"
  ]
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
    lessons: ["Enterprise printer work is ugly, but extremely needed."],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}