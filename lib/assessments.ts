export type AssessmentType = "vendor-migration" | "itam";

export type AssessmentOption = {
  value: string;
  label: string;
  points: number | null;
  helper?: string;
};

export type AssessmentQuestion = {
  id: string;
  category: string;
  text: string;
  critical?: boolean;
  criticalTitle?: string;
  criticalRecommendation?: string;
};

export type AssessmentDefinition = {
  type: AssessmentType;
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  scoreLabel: string;
  scoringDirection: "risk" | "maturity";
  options: AssessmentOption[];
  questions: AssessmentQuestion[];
};

export type AssessmentResult = {
  score: number;
  rating: string;
  ratingDescription: string;
  categoryScores: Record<string, number>;
  criticalFlags: Array<{
    questionId: string;
    title: string;
    question: string;
    recommendation: string;
  }>;
  topRecommendations: Array<{
    category: string;
    score: number;
    text: string;
  }>;
};

const vendorOptions: AssessmentOption[] = [
  { value: "yes", label: "Yes / fully documented", points: 0 },
  { value: "mostly", label: "Mostly", points: 1 },
  { value: "partially", label: "Partially", points: 2 },
  { value: "no", label: "No", points: 4 },
  { value: "unknown", label: "Unknown", points: 4 },
  { value: "na", label: "Not applicable", points: null },
];

const itamOptions: AssessmentOption[] = [
  { value: "not_in_place", label: "Not in place / unknown", points: 0 },
  { value: "ad_hoc", label: "Ad hoc", points: 1 },
  { value: "partial", label: "Partially defined", points: 2 },
  { value: "consistent", label: "Consistently implemented", points: 3 },
  { value: "managed", label: "Managed, measured & documented", points: 4 },
];

export const vendorMigrationAssessment: AssessmentDefinition = {
  type: "vendor-migration",
  title: "Vendor Migration Risk Assessment",
  shortTitle: "Vendor Migration",
  eyebrow: "FREE RISK ASSESSMENT",
  intro:
    "Measure how much migration risk is hiding in your scope, dependencies, access, testing, recovery, and handoff plan. Your score is available immediately — no contact information required.",
  scoreLabel: "Migration Risk Score",
  scoringDirection: "risk",
  options: vendorOptions,
  questions: [
    { id: "vm01", category: "Scope & Governance", text: "Is the business reason for the migration clearly documented and agreed upon?" },
    { id: "vm02", category: "Scope & Governance", text: "Is the exact scope of systems, services, locations, assets, applications, or users affected by the migration documented?" },
    { id: "vm03", category: "Scope & Governance", text: "Does every major migration workstream have a named owner responsible for its outcome?" },
    { id: "vm04", category: "Scope & Governance", text: "Are responsibilities clearly divided between your organization, the incumbent vendor, and the incoming vendor?" },
    { id: "vm05", category: "Scope & Governance", text: "Are executive sponsors and affected business stakeholders actively involved in migration planning?" },

    { id: "vm06", category: "Current-State Discovery", text: "Do you have a current and validated inventory of everything included in the migration?", critical: true, criticalTitle: "Inventory visibility risk", criticalRecommendation: "Validate the in-scope inventory before final sequencing or cutover planning. Unknown assets and services become unplanned outages." },
    { id: "vm07", category: "Current-State Discovery", text: "Have undocumented, legacy, or unsupported systems and assets been identified?" },
    { id: "vm08", category: "Current-State Discovery", text: "Have current configurations, workflows, integrations, and business processes been documented?" },
    { id: "vm09", category: "Current-State Discovery", text: "Are current contracts, SLAs, support agreements, renewal dates, and termination requirements documented?" },
    { id: "vm10", category: "Current-State Discovery", text: "Does your organization independently control or have documented access to required administrative credentials, accounts, licenses, certificates, and keys?", critical: true, criticalTitle: "Access and credential risk", criticalRecommendation: "Confirm ownership and recoverability of privileged access, service accounts, certificates, licenses, and keys before vendor separation begins." },

    { id: "vm11", category: "Dependencies & Data", text: "Have technical dependencies between systems, applications, infrastructure, vendors, and services been mapped?", critical: true, criticalTitle: "Dependency risk", criticalRecommendation: "Build a dependency map and use it to define migration groups and cutover order before production changes are scheduled." },
    { id: "vm12", category: "Dependencies & Data", text: "Have business dependencies and mission-critical workflows been identified?" },
    { id: "vm13", category: "Dependencies & Data", text: "Has all data requiring migration, retention, archival, or destruction been identified?" },
    { id: "vm14", category: "Dependencies & Data", text: "Have integrations, APIs, authentication systems, DNS, certificates, firewall rules, service accounts, and other external dependencies been identified where applicable?" },
    { id: "vm15", category: "Dependencies & Data", text: "Has the organization identified what should not be migrated because it is obsolete, redundant, unsupported, or unnecessary?" },

    { id: "vm16", category: "Testing, Cutover & Recovery", text: "Is there a documented migration or cutover plan with sequencing, owners, dates, and dependencies?" },
    { id: "vm17", category: "Testing, Cutover & Recovery", text: "Have measurable acceptance criteria been defined for determining whether the migration succeeded?", critical: true, criticalTitle: "Acceptance criteria missing", criticalRecommendation: "Define measurable acceptance criteria before cutover so success is based on evidence rather than a subjective go-live decision." },
    { id: "vm18", category: "Testing, Cutover & Recovery", text: "Will migrated systems, services, data, and business workflows be tested before final acceptance?" },
    { id: "vm19", category: "Testing, Cutover & Recovery", text: "Is there a documented rollback or recovery plan if the migration fails?", critical: true, criticalTitle: "Rollback risk", criticalRecommendation: "Document the rollback decision point, responsibilities, recovery steps, and time limits before the production migration begins." },
    { id: "vm20", category: "Testing, Cutover & Recovery", text: "Are backups, recovery procedures, or other safeguards verified before irreversible changes occur?", critical: true, criticalTitle: "Recovery safeguard risk", criticalRecommendation: "Verify backups and recovery procedures before irreversible changes. A backup that has not been tested is an assumption, not a control." },

    { id: "vm21", category: "Transition & Operational Readiness", text: "Has a formal knowledge-transfer plan been established between the incumbent, internal team, and incoming vendor?" },
    { id: "vm22", category: "Transition & Operational Readiness", text: "Are operational documentation, diagrams, procedures, support contacts, and escalation paths being transferred?" },
    { id: "vm23", category: "Transition & Operational Readiness", text: "Have internal staff and service-desk personnel been trained for the post-migration environment?" },
    { id: "vm24", category: "Transition & Operational Readiness", text: "Is there a defined stabilization or hypercare period after cutover with enhanced monitoring and support?" },
    { id: "vm25", category: "Transition & Operational Readiness", text: "Are ownership, support responsibilities, documentation, metrics, and ongoing governance clearly defined for the environment after the migration is complete?" },
  ],
};

export const itamAssessment: AssessmentDefinition = {
  type: "itam",
  title: "IT Asset Management Maturity Assessment",
  shortTitle: "IT Asset Management",
  eyebrow: "FREE ITAM ASSESSMENT",
  intro:
    "Measure the maturity of your ITAM program across governance, inventory quality, lifecycle controls, software and financial management, and risk. Your score is available immediately — no contact information required.",
  scoreLabel: "ITAM Maturity Score",
  scoringDirection: "maturity",
  options: itamOptions,
  questions: [
    { id: "it01", category: "Governance & Ownership", text: "Does your organization have a formally defined IT Asset Management program or function?" },
    { id: "it02", category: "Governance & Ownership", text: "Are ITAM roles, responsibilities, ownership, and decision authority clearly documented?" },
    { id: "it03", category: "Governance & Ownership", text: "Are formal policies established for acquisition, deployment, use, transfer, return, and disposal of IT assets?" },
    { id: "it04", category: "Governance & Ownership", text: "Are ITAM objectives aligned with business, financial, security, procurement, and technology objectives?" },
    { id: "it05", category: "Governance & Ownership", text: "Are ITAM performance, risks, exceptions, and improvement priorities regularly reviewed by management?" },

    { id: "it06", category: "Inventory & Data Quality", text: "Can you identify what IT assets your organization owns, leases, subscribes to, or otherwise controls?" },
    { id: "it07", category: "Inventory & Data Quality", text: "Can you reliably determine where each asset is located and who or what is responsible for it?" },
    { id: "it08", category: "Inventory & Data Quality", text: "Are asset records regularly discovered, validated, reconciled, and corrected?" },
    { id: "it09", category: "Inventory & Data Quality", text: "Are required data fields, naming standards, asset states, and data ownership clearly defined?" },
    { id: "it10", category: "Inventory & Data Quality", text: "Are asset-management tools integrated or reconciled with systems such as procurement, CMDB/discovery, endpoint management, finance, HR, or service management?" },

    { id: "it11", category: "Asset Lifecycle Management", text: "Are technology purchases routed through a defined and controlled acquisition process?" },
    { id: "it12", category: "Asset Lifecycle Management", text: "Are assets consistently recorded and assigned before or during deployment?" },
    { id: "it13", category: "Asset Lifecycle Management", text: "Are moves, adds, changes, transfers, repairs, losses, and ownership changes reflected in asset records?" },
    { id: "it14", category: "Asset Lifecycle Management", text: "Is there a reliable process for recovering assets when employees leave or change roles?" },
    { id: "it15", category: "Asset Lifecycle Management", text: "Are retired assets securely sanitized, disposed of, recycled, returned, or otherwise closed out with documented evidence?" },

    { id: "it16", category: "Software, Contracts & Financial Control", text: "Can your organization identify the software products, subscriptions, and cloud services it is entitled to use?" },
    { id: "it17", category: "Software, Contracts & Financial Control", text: "Are license entitlements reconciled against actual deployment or consumption?" },
    { id: "it18", category: "Software, Contracts & Financial Control", text: "Are software renewals, contracts, maintenance agreements, warranties, and expiration dates centrally tracked?" },
    { id: "it19", category: "Software, Contracts & Financial Control", text: "Can ITAM identify unused, underused, duplicate, or unnecessary technology spending?" },
    { id: "it20", category: "Software, Contracts & Financial Control", text: "Are asset records reconciled with purchasing and financial records sufficiently to support budgeting, forecasting, chargeback, audit, or cost optimization?" },

    { id: "it21", category: "Risk, Security & Optimization", text: "Can ITAM identify unsupported, end-of-life, unpatched, unauthorized, missing, or otherwise high-risk assets?" },
    { id: "it22", category: "Risk, Security & Optimization", text: "Are lost, stolen, missing, or unaccounted-for assets investigated and formally reconciled?" },
    { id: "it23", category: "Risk, Security & Optimization", text: "Are ITAM records used to support cybersecurity, compliance, audit, business continuity, or risk-management activities?" },
    { id: "it24", category: "Risk, Security & Optimization", text: "Are meaningful ITAM KPIs or data-quality metrics defined, measured, and reported?" },
    { id: "it25", category: "Risk, Security & Optimization", text: "Does the organization regularly identify and implement improvements based on ITAM data, audit findings, cost opportunities, business changes, or technology changes?" },
  ],
};

export const assessments: Record<AssessmentType, AssessmentDefinition> = {
  "vendor-migration": vendorMigrationAssessment,
  itam: itamAssessment,
};

const recommendationCopy: Record<AssessmentType, Record<string, string>> = {
  "vendor-migration": {
    "Scope & Governance": "Clarify scope, owners, decision authority, and vendor responsibilities before adding more technical activity to the plan.",
    "Current-State Discovery": "Complete a validated current-state inventory and document access, contracts, configurations, and legacy exceptions before finalizing migration waves.",
    "Dependencies & Data": "Map technical and business dependencies, data handling requirements, and integration points before determining cutover order.",
    "Testing, Cutover & Recovery": "Strengthen acceptance criteria, testing, rollback, and recovery safeguards before production migration begins.",
    "Transition & Operational Readiness": "Define knowledge transfer, documentation, training, hypercare, and steady-state ownership before the migration team exits.",
  },
  itam: {
    "Governance & Ownership": "Define an accountable ITAM operating model with documented ownership, policies, objectives, and management review.",
    "Inventory & Data Quality": "Prioritize trustworthy inventory data, reconciliation, ownership, and integration before expanding reporting or automation.",
    "Asset Lifecycle Management": "Standardize lifecycle controls from acquisition through assignment, movement, recovery, and secure retirement.",
    "Software, Contracts & Financial Control": "Connect entitlement, consumption, contracts, renewals, and financial records so ITAM can expose compliance and cost opportunities.",
    "Risk, Security & Optimization": "Use ITAM data actively for security, audit, risk, KPI reporting, and continual improvement rather than treating the repository as static inventory.",
  },
};

function ratingFor(type: AssessmentType, score: number) {
  if (type === "vendor-migration") {
    if (score <= 19) return ["Low Risk", "Your migration foundation appears strong. Continue validating assumptions and protect the controls already in place."] as const;
    if (score <= 39) return ["Moderate Risk", "The migration is workable, but several gaps should be closed before they become cutover issues."] as const;
    if (score <= 59) return ["High Risk", "Material migration exposure exists. Remediation should be part of the project plan, not deferred until cutover."] as const;
    if (score <= 79) return ["Severe Risk", "Significant disruption risk is present. The migration plan needs stronger discovery, control, and recovery coverage."] as const;
    return ["Critical Risk", "The current readiness profile contains major gaps. Production migration should not proceed without focused remediation."] as const;
  }

  if (score <= 20) return ["Level 1 — Reactive", "ITAM is primarily manual, event-driven, or dependent on individual knowledge."] as const;
  if (score <= 40) return ["Level 2 — Developing", "Some ITAM processes and tools exist, but coverage and execution are inconsistent."] as const;
  if (score <= 60) return ["Level 3 — Controlled", "Core ITAM processes are established, with meaningful opportunities to improve integration, measurement, and consistency."] as const;
  if (score <= 80) return ["Level 4 — Managed", "ITAM is governed and increasingly integrated into operational, financial, and risk decisions."] as const;
  return ["Level 5 — Optimized", "ITAM is mature, measured, integrated, and actively used to improve cost, control, and technology decisions."] as const;
}

export function calculateAssessment(
  type: AssessmentType,
  answers: Record<string, string>,
): AssessmentResult {
  const definition = assessments[type];
  const optionPoints = new Map(definition.options.map((option) => [option.value, option.points]));
  const categories = Array.from(new Set(definition.questions.map((question) => question.category)));
  const categoryEarned: Record<string, number> = Object.fromEntries(categories.map((category) => [category, 0]));
  const categoryAvailable: Record<string, number> = Object.fromEntries(categories.map((category) => [category, 0]));

  let earned = 0;
  let available = 0;

  for (const question of definition.questions) {
    const answer = answers[question.id];
    const points = optionPoints.get(answer);
    if (points === undefined || points === null) continue;
    earned += points;
    available += 4;
    categoryEarned[question.category] += points;
    categoryAvailable[question.category] += 4;
  }

  const rawScore = available ? Math.round((earned / available) * 100) : 0;
  const score = definition.scoringDirection === "risk" ? rawScore : rawScore;
  const [rating, ratingDescription] = ratingFor(type, score);

  const categoryScores: Record<string, number> = {};
  for (const category of categories) {
    const denominator = categoryAvailable[category];
    const rawCategory = denominator ? Math.round((categoryEarned[category] / denominator) * 100) : 0;
    categoryScores[category] = rawCategory;
  }

  const criticalFlags = definition.questions
    .filter((question) => question.critical && ["no", "unknown"].includes(answers[question.id]))
    .map((question) => ({
      questionId: question.id,
      title: question.criticalTitle || "Critical risk",
      question: question.text,
      recommendation: question.criticalRecommendation || "Resolve this issue before continuing.",
    }));

  const rankedCategories = Object.entries(categoryScores).sort((a, b) => {
    if (definition.scoringDirection === "risk") return b[1] - a[1];
    return a[1] - b[1];
  });

  const topRecommendations = rankedCategories.slice(0, 3).map(([category, categoryScore]) => ({
    category,
    score: categoryScore,
    text: recommendationCopy[type][category],
  }));

  return {
    score,
    rating,
    ratingDescription,
    categoryScores,
    criticalFlags,
    topRecommendations,
  };
}

export function validateAnswers(type: AssessmentType, answers: Record<string, string>) {
  const definition = assessments[type];
  const validOptions = new Set(definition.options.map((option) => option.value));
  return definition.questions.every((question) => validOptions.has(answers[question.id]));
}
