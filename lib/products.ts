export type Product = {
  slug: "tvm" | "otles" | "roffle" | "tasks";
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  externalUrl: string;
  screenshot: string;
  screenshotAlt: string;
  showcaseVideo?: string;
  adminVideo?: string;
  adminHeading?: string;
  adminDescription?: string;
  audience: string;
  accent: string;
  flagship: boolean;
  features: string[];
  proofPoints: string[];
};

export const products: Product[] = [
  {
    slug: "tvm",
    name: "OneTime Menu",
    eyebrow: "Digital menu boards",
    summary: "Turn any screen with a modern browser into a digital restaurant menu board.",
    description:
      "OneTime Menu gives restaurants, bars, cafés, breweries, food trucks, and venues a practical way to run digital menu boards without proprietary display hardware.",
    externalUrl: "https://tvm.onetimelabs.net",
    screenshot: "/screenshots/tvm.png",
    screenshotAlt: "OneTime Menu dashboard and live menu preview",
    showcaseVideo: "/videos/tvm-showcase.mp4",
    adminVideo: "/videos/tvm-admin.mp4",
    adminHeading: "The menu on the wall starts here.",
    adminDescription:
      "Menus, items, screens, scheduling, specials, and appearance are managed from one browser-based workspace. Update the source and the display follows.",
    audience: "Restaurants, bars, cafés, breweries, food trucks, concessions, and small chains.",
    accent: "#d66a2f",
    flagship: true,
    features: [
      "Browser-based fullscreen displays",
      "Multiple menus and screens",
      "Breakfast, lunch, dinner, and late-night scheduling",
      "Sold-out and special-item controls",
      "Remote menu updates",
      "No proprietary signage box required",
    ],
    proofPoints: ["Any modern browser", "Multiple screens", "Remote updates"],
  },
  {
    slug: "otles",
    name: "OTLES",
    eyebrow: "Engineering documentation",
    summary: "Structured technical documentation for teams that care about standards, ownership, and clarity.",
    description:
      "OTLES is a documentation platform built for engineering standards, technical procedures, architecture, and operational knowledge that should stay organized as it grows.",
    externalUrl: "https://otles.onetimelabs.net",
    screenshot: "/screenshots/otles.png",
    screenshotAlt: "OTLES engineering documentation workspace",
    showcaseVideo: "/videos/otles-showcase.mp4",
    adminVideo: "/videos/otles-admin.mp4",
    adminHeading: "Structure on the front. Control behind it.",
    adminDescription:
      "The administration side handles the organizational structure that keeps documents, categories, publishing, and access from becoming another shared-drive problem.",
    audience: "Engineering teams, IT operations, technical writers, consultants, and software organizations.",
    accent: "#315fce",
    flagship: true,
    features: [
      "Structured document hierarchy",
      "Organization and folder management",
      "Versioned engineering documentation",
      "Purpose-built technical markup",
      "Reusable standards and templates",
      "Documentation designed to stay maintainable",
    ],
    proofPoints: ["Structured docs", "Versioned standards", "Technical workflows"],
  },
  {
    slug: "roffle",
    name: "ROFFLE",
    eyebrow: "Social publishing + entertainment",
    summary: "A social media, publishing, and entertainment platform built around content and conversation.",
    description:
      "ROFFLE is OneTime Labs' consumer-facing social experiment: posts, video, blog content, forums, tags, and community interaction in a product that is deliberately its own thing.",
    externalUrl: "https://roffle.onetimelabs.net",
    screenshot: "/screenshots/roffle.png",
    screenshotAlt: "ROFFLE social publishing front page",
    showcaseVideo: "/videos/roffle-showcase.mp4",
    adminVideo: "/videos/roffle-admin.mp4",
    adminHeading: "A living front page needs a real control room.",
    adminDescription:
      "ROFFLE's administration tools manage content, categories, tags, blog publishing, and moderation while the public side stays focused on discovery and participation.",
    audience: "Creators, communities, readers, entertainment audiences, and people who still like discovering things online.",
    accent: "#ff5a2f",
    flagship: true,
    features: [
      "Social publishing",
      "Video and media posts",
      "Blog and editorial content",
      "Forums and community discussion",
      "Taxonomy and content discovery",
      "Administration and moderation tools",
    ],
    proofPoints: ["Publishing", "Community", "Entertainment"],
  },
  {
    slug: "tasks",
    name: "Tasks",
    eyebrow: "Daily work tracking",
    summary: "Straightforward daily work tracking without turning every task into a project-management ceremony.",
    description:
      "Tasks is a focused work tracker for teams and individuals who need daily work, history, statuses, and notes without the overhead of a heavyweight project suite.",
    externalUrl: "https://tasks.onetimelabs.net",
    screenshot: "/screenshots/tasks.svg",
    screenshotAlt: "Tasks daily work tracking interface",
    audience: "Small teams, technical operations, consultants, field teams, and individual professionals.",
    accent: "#218c69",
    flagship: false,
    features: [
      "Daily work tracking",
      "Task history",
      "Status management",
      "Notes and work context",
      "Portable JSON backup",
      "Excel export",
    ],
    proofPoints: ["Daily work", "Portable data", "Simple workflow"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
