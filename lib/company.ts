export const enterpriseExperience = [
  "Hewlett-Packard",
  "SC Johnson",
  "Google",
  "Ricoh",
  "Bank of America",
] as const;

export const consultingPricing = [
  {
    service: "Initial consultation",
    price: "No charge",
    note: "A short fit-and-scope conversation to understand the environment, problem, and next step.",
  },
  {
    service: "Remote consulting",
    price: "$175 / hour",
    note: "Architecture, planning, technical advisory, troubleshooting, migration support, and implementation work.",
  },
  {
    service: "Onsite consulting",
    price: "$225 / hour",
    note: "Onsite technical work in the Racine, Milwaukee, and Chicago service corridor.",
  },
  {
    service: "Full consulting day",
    price: "$1,500 / day",
    note: "A reserved day for assessments, workshops, migration execution, technical cleanup, or implementation.",
  },
  {
    service: "Vendor migration engagement",
    price: "From $5,000",
    note: "Scoped around systems, vendors, locations, dependencies, transition risk, and cutover requirements.",
  },
  {
    service: "Managed print assessment",
    price: "From $2,500",
    note: "Fleet, tooling, print architecture, governance, compliance, vendor, and transition review.",
  },
  {
    service: "Custom operational software",
    price: "Quoted by scope",
    note: "Purpose-built applications, workflow tools, dashboards, integrations, and internal systems.",
  },
  {
    service: "Long-term / fractional engagement",
    price: "Contract pricing",
    note: "Ongoing architecture, migration leadership, implementation, or operational support.",
  },
] as const;

export const enterpriseSoftware = [
  {
    name: "OTLES",
    discipline: "Engineering documentation",
    description:
      "Structured engineering standards, documentation, revisions, organizational hierarchy, and controlled technical knowledge.",
  },
  {
    name: "ChangeOps",
    discipline: "Change governance",
    description:
      "Change intake, review, evidence, approvals, CAB workflow, and operational audit history without adopting an entire ITSM suite.",
  },
  {
    name: "PCCR",
    discipline: "Managed print",
    description:
      "Printer compliance and fleet reporting built around enterprise Streamline NX and Web JetAdmin exports.",
  },
  {
    name: "OneTime Labs Licensing",
    discipline: "Software licensing",
    description:
      "Customer, product, license, seat, activation, entitlement, expiration, and perpetual ownership management.",
  },
  {
    name: "OTLAM",
    discipline: "Asset management",
    description:
      "Modular asset lifecycle management designed around assignments, history, ownership, inventory, and operational records.",
  },
  {
    name: "PlotMap",
    discipline: "Geospatial operations",
    description:
      "Location and grounds data organized into a practical map-driven operational system for records, field verification, and public lookup.",
  },
] as const;

export const creatorSoftware = [
  {
    name: "R3DACT / Streamer Safety",
    discipline: "Broadcast safety",
    description:
      "Fast operator controls intended to reduce accidental on-stream exposure and give creators an immediate safety layer during live production.",
  },
  {
    name: "Streamer Toolkit",
    discipline: "Twitch / YouTube utilities",
    description:
      "Browser, OBS, overlay, moderation, and creator utilities built around practical live-streaming workflows.",
  },
  {
    name: "IvanSays OBS Tools",
    discipline: "Realtime overlays",
    description:
      "Realtime message and text overlays for OBS and live-production environments, backed by simple operator controls.",
  },
] as const;
