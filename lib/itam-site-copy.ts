/**
 * ONETIME LABS — MARKETING COPY / SINGLE EDITING LOCATION
 * ------------------------------------------------------
 * SECTION 001 — COMPANY TAGLINE
 * Set companyTagline to "" to hide it. No marketing slogan is required.
 *
 * All main homepage, ITAM service page and footer messaging lives in this file.
 * Do not change layout components just to change website wording.
 *
 * NOTE ON CLAIMS: founderExperience describes Ivan's prior employment / assignments.
 * It is NOT a list of OneTime Labs clients and must never be labeled as such.
 */

// ============================================================
// SECTION 001 — COMPANY TAGLINE (EDIT HERE)
// ============================================================
export const companyTagline = "";

// ============================================================
// SECTION 002 — PRIMARY BUSINESS / HERO
// ============================================================
export const siteCopy = {
  name: "OneTime Labs",
  specialty: "IT Asset Management & Inventory Systems",
  eyebrow: "IT ASSET MANAGEMENT • SOFTWARE LICENSING • CMDB GOVERNANCE",
  heroTitle: "Get your IT asset records under control.",
  heroDescription:
    "We identify what you own, verify it against your systems, correct inaccurate records, and put the processes in place to keep them current—from receiving and deployment through recovery and retirement.",
  heroPrimary: "Discuss your ITAM environment",
  heroSecondary: "See what we do",
  capabilityHeadline: "We fix the data. Then we fix the process behind it.",
  capabilityIntro:
    "A reliable asset program needs more than a tool. We work across physical assets, discovery data, purchasing, service management, endpoint platforms, and finance to establish trustworthy records and accountable workflows.",
  platformHeadline: "Your environment. Your system of record.",
  platformIntro:
    "We can improve the platform you already have, or implement a fit-for-purpose asset database where one does not exist. The goal is usable, maintained asset information—not a spreadsheet handed over at the end of a project.",
  processHeadline: "From incomplete records to an operational ITAM program.",
  adjacentHeadline: "Asset management extends beyond IT.",
  adjacentIntro:
    "ITAM is our primary specialty. We also support the inventory and operational asset processes that connect to it, including warehouse stock, retail inventory, facilities equipment, and fixed-asset records.",
  closingHeadline: "Start with the asset problem you have today.",
  closingBody:
    "Missing equipment, unreliable CMDB data, software licensing exposure, an upcoming refresh, or no established asset process at all—we can start with a focused assessment and scope the work from there.",
} as const;

// ============================================================
// SECTION 003 — PRIMARY ITAM SERVICES
// ============================================================
export const itamServices = [
  {
    number: "01", title: "Hardware asset management", short: "Know which devices exist, who has them, and what happens next.",
    detail: "Build and maintain device inventories across endpoints, printers, networking, peripherals, and shared equipment. Establish custody, location, lifecycle status, refresh planning, and traceable retirement.",
    tasks: ["Receiving, tagging, and deployment controls", "Owner, location, and custody reconciliation", "Transfers, recovery, refresh, and disposition"],
    output: "A governed hardware asset register with repeatable lifecycle workflows.",
  },
  {
    number: "02", title: "Software asset & license management", short: "Match what is deployed with what the business is entitled to use.",
    detail: "Reconcile installations, entitlements, publisher contracts, usage, and renewals. Identify unused allocations, reclaim licenses where permitted, and establish a defensible effective license position.",
    tasks: ["Deployment-to-entitlement reconciliation", "License harvesting and reallocation", "Renewal planning and audit evidence"],
    output: "Actionable license positions, documented exceptions, and controlled reclamation.",
  },
  {
    number: "03", title: "CMDB & data quality", short: "Make the system of record something your team can rely on.",
    detail: "Define asset classes, field ownership, unique identifiers, authoritative sources, and reconciliation rules. Improve links between ITAM records, configuration items, discovery, endpoint tools, and service-management processes.",
    tasks: ["Asset-to-CI modeling and taxonomy", "Duplicate, stale, and orphan-record cleanup", "Source integration and field-level governance"],
    output: "Improved asset and CI records with ownership and validation rules.",
  },
  {
    number: "04", title: "Inventory verification & reconciliation", short: "Find the gaps between physical reality and recorded inventory.",
    detail: "Compare available inventory data against physical checks, procurement records, device discovery, endpoint management, and assigned ownership. Investigate exceptions and correct them in the designated system.",
    tasks: ["Physical and system inventory validation", "Missing, duplicate, and unassigned asset investigation", "Updates directly in the designated platform"],
    output: "Verified records, resolved discrepancies, and repeatable audit controls.",
  },
  {
    number: "05", title: "ITAM process design & automation", short: "Stop accurate data from becoming inaccurate again.",
    detail: "Design the operational controls around purchasing, receiving, onboarding, employee moves, offboarding, repair, reclamation, and disposal. Add appropriate integrations and automated updates at each lifecycle event.",
    tasks: ["Procure-to-retire workflow design", "ITSM, HR, endpoint, and procurement touchpoints", "SOPs, roles, approval paths, and control checks"],
    output: "Owned and documented processes that keep records current.",
  },
  {
    number: "06", title: "ITAM assessment & program recovery", short: "Find what's wrong, prioritize what matters, and put the fixes to work.",
    detail: "Review current tools, data sources, controls, reporting, and ownership. Establish baseline quality measures and a phased implementation plan. We can stay involved in remediation and handoff—not just deliver recommendations.",
    tasks: ["Maturity and data quality assessment", "Risk-based remediation backlog", "Implementation and operational handoff"],
    output: "An executable plan with verified issues, priorities, owners, and measurements.",
  },
] as const;

// ============================================================
// SECTION 004 — OPERATING MODEL / SYSTEMS
// ============================================================
export const recordOptions = [
  {
    title: "Improve your existing platform",
    body: "Clean up and extend the asset information you already manage in ServiceNow, Flexera, endpoint tools, procurement systems, or a similar environment. Define what each system owns and reconcile data between them.",
    note: "Assess → map sources → repair data → improve workflows",
  },
  {
    title: "Implement a new asset register",
    body: "When no suitable system exists, define the data model, permissions, asset states, assignment history, reporting, and integration needs. Build or configure a maintainable solution appropriate to the organization.",
    note: "Requirements → data model → implementation → adoption",
  },
] as const;

export const deliverySteps = [
  {step:"01",title:"Discover",body:"Review current platforms, inventory sources, lifecycle events, and business priorities."},
  {step:"02",title:"Verify",body:"Establish a baseline, investigate mismatches, and confirm asset and license data."},
  {step:"03",title:"Implement",body:"Correct records, configure the system, and establish controls and workflows."},
  {step:"04",title:"Operate",body:"Set ownership, reporting, exception queues, and a cadence that keeps records accurate."},
] as const;

// ============================================================
// SECTION 005 — RESUME-BASED FOUNDER EXPERIENCE
// Prior employment / assignment numbers, NOT OTL project results.
// ============================================================
export const founderMetrics = [
  {value:"25,000+",label:"hardware and software assets managed",source:"Allied Digital assignment supporting Daimler Truck"},
  {value:"~98%",label:"inventory accuracy maintained",source:"Daimler Truck assignment"},
  {value:"$250K+",label:"unused software license value recovered",source:"Daimler Truck assignment"},
  {value:"40,000+",label:"devices in an enterprise print environment",source:"HPE assignment supporting Bank of America"},
] as const;

export const founderExperience = [
  {organization:"Daimler Truck North America",context:"IT Asset Manager · Allied Digital assignment",detail:"25,000+ assets, ServiceNow CMDB governance, software entitlements, reconciliation, and license recovery."},
  {organization:"Bank of America",context:"Sr. Solutions Analyst · Hewlett-Packard Enterprise assignment",detail:"40,000+ device print estate; 1,200+ MFP deployments across 15+ countries and enterprise security work."},
  {organization:"SC Johnson",context:"Enterprise print systems · contract assignment",detail:"HP/Ricoh fleet transition, device lifecycle standards, operational change control, and print infrastructure."},
] as const;

export const experienceDisclosure = "These are examples from the founder’s previous employment and contract assignments. The named organizations are not represented as OneTime Labs clients, partners, sponsors, or endorsers. Figures are drawn from the founder’s résumé and describe that prior work—not results delivered by OneTime Labs.";

// ============================================================
// SECTION 006 — COMPLEMENTARY SERVICES (RETAINED, SECONDARY)
// ============================================================
export const adjacentServices = [
  {title:"Warehouse & stock inventory",body:"Stock location design, receiving controls, cycle counts, stock movements, and inventory reconciliation using a WMS or inventory platform."},
  {title:"Retail & physical inventory",body:"SKU and location controls, count accuracy, shrink investigation, replenishment processes, and POS/inventory record alignment."},
  {title:"Equipment & fixed assets",body:"Asset tagging, location and custody records, maintenance and retirement status, and coordination with finance for asset records."},
  {title:"Related technology services",body:"Vendor and platform migrations, managed print, reporting, operational integrations, and purpose-built tools that support the asset program."},
] as const;

export const adjacentLinks = [
  {label:"General business solutions",href:"/business"},
  {label:"Vendor migrations",href:"/vendor-migration"},
  {label:"Managed print",href:"/managed-print-services"},
  {label:"Other software & tools",href:"/software"},
] as const;
