export type AssessmentType = string;

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
  group?: string;
  estimatedMinutes?: string;
  categoryRecommendations?: Record<string, string>;
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
  group: "Strategy & Delivery",
  estimatedMinutes: "About 5-7 minutes",
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
  group: "Assets & Spend",
  estimatedMinutes: "About 5-7 minutes",
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


type MaturityCategorySpec = {
  name: string;
  recommendation: string;
  questions: [string, string, string];
};

type MaturityAssessmentSpec = {
  type: string;
  prefix: string;
  title: string;
  shortTitle: string;
  group: string;
  intro: string;
  scoreLabel: string;
  categories: [MaturityCategorySpec, MaturityCategorySpec, MaturityCategorySpec, MaturityCategorySpec, MaturityCategorySpec];
};

function maturityAssessment(spec: MaturityAssessmentSpec): AssessmentDefinition {
  let questionNumber = 0;
  const questions: AssessmentQuestion[] = [];
  const categoryRecommendations: Record<string, string> = {};

  for (const category of spec.categories) {
    categoryRecommendations[category.name] = category.recommendation;
    for (const text of category.questions) {
      questionNumber += 1;
      questions.push({
        id: `${spec.prefix}${String(questionNumber).padStart(2, "0")}`,
        category: category.name,
        text,
      });
    }
  }

  return {
    type: spec.type,
    title: spec.title,
    shortTitle: spec.shortTitle,
    eyebrow: "FREE TECHNOLOGY ASSESSMENT",
    intro: spec.intro,
    scoreLabel: spec.scoreLabel,
    scoringDirection: "maturity",
    group: spec.group,
    estimatedMinutes: "About 4-6 minutes",
    categoryRecommendations,
    options: itamOptions,
    questions,
  };
}

const additionalAssessments: AssessmentDefinition[] = [
  maturityAssessment({
    type: "software-asset-management", prefix: "sm", title: "Software Asset Management & Licensing Assessment", shortTitle: "Software Asset Management", group: "Assets & Spend", scoreLabel: "SAM Maturity Score",
    intro: "Measure how well your organization controls software entitlement, deployment, renewals, audit exposure, and optimization.",
    categories: [
      { name: "Governance & Ownership", recommendation: "Define accountable SAM ownership, publisher priorities, policies, and review cadence before expanding tooling.", questions: ["Is there a formally owned software asset management function or responsibility?", "Are software acquisition, installation, use, transfer, and retirement policies documented?", "Are high-risk publishers, audit exposure, and optimization priorities reviewed by management?"] },
      { name: "Entitlements & Evidence", recommendation: "Centralize license evidence and normalize entitlement records so effective license positions can be reproduced.", questions: ["Can you produce reliable entitlement records for your major software publishers?", "Are contracts, purchase records, license keys, metrics, and product-use rights centrally retained?", "Are publisher-specific licensing rules documented well enough to support repeatable reconciliation?"] },
      { name: "Deployment & Reconciliation", recommendation: "Improve software discovery, normalization, and reconciliation between entitlement and actual use.", questions: ["Can you identify where licensed software is installed or consumed across the environment?", "Are installations and usage records normalized to consistent publisher and product names?", "Are entitlements regularly reconciled against deployment or consumption to identify compliance gaps?"] },
      { name: "Renewals & Audit Readiness", recommendation: "Create renewal lead time, audit playbooks, and evidence ownership before a publisher forces the timeline.", questions: ["Are renewal dates, notice periods, maintenance terms, and support agreements centrally tracked?", "Can the organization respond to a publisher audit without rebuilding records from scratch?", "Are audit requests, true-up exposure, and remediation actions governed through a defined process?"] },
      { name: "Optimization & Value", recommendation: "Close the loop from usage insight to reclamation, rightsizing, and measured savings.", questions: ["Do you identify unused, underused, duplicate, or unnecessary software and subscriptions?", "Is there a repeatable process to reclaim or reassign licenses when employees leave or roles change?", "Are SAM savings, avoided spend, and risk reduction measured and reported?"] },
    ],
  }),
  maturityAssessment({
    type: "saas-governance", prefix: "sg", title: "SaaS Governance & Subscription Optimization Assessment", shortTitle: "SaaS Governance", group: "Assets & Spend", scoreLabel: "SaaS Governance Score",
    intro: "Find hidden SaaS spend, unmanaged subscriptions, duplicate tools, weak ownership, and renewal risk across your application portfolio.",
    categories: [
      { name: "Visibility & Inventory", recommendation: "Build a trusted SaaS inventory from finance, SSO, expense, procurement, and browser/discovery sources.", questions: ["Can you identify the SaaS applications currently paid for or used by the organization?", "Are SaaS owners, business purpose, user populations, and criticality recorded?", "Are unsanctioned or employee-purchased SaaS subscriptions discovered and reviewed?"] },
      { name: "Ownership & Governance", recommendation: "Assign business and technical owners with standards for approval, administration, and retirement.", questions: ["Does every material SaaS application have a named business owner and technical/admin owner?", "Are new SaaS purchases reviewed for security, privacy, architecture, and overlap before approval?", "Are standards defined for when a SaaS product should be consolidated, replaced, or retired?"] },
      { name: "Licensing & Utilization", recommendation: "Measure assigned versus active use and establish recurring reclamation and rightsizing workflows.", questions: ["Can you compare paid seats or tiers with actual active use?", "Are inactive accounts and over-provisioned license tiers identified on a recurring basis?", "Are licenses reclaimed promptly when employees leave or no longer need access?"] },
      { name: "Renewals & Spend", recommendation: "Create forward-looking renewal visibility and use utilization evidence before negotiations begin.", questions: ["Are SaaS renewal dates, notice periods, pricing terms, and auto-renew clauses centrally tracked?", "Do owners receive enough lead time to evaluate utilization and alternatives before renewal?", "Can the organization report SaaS spend by vendor, department, cost center, or business capability?"] },
      { name: "Risk & Offboarding", recommendation: "Standardize SaaS offboarding, data retention, access removal, and vendor exit requirements.", questions: ["Are SSO, MFA, admin-role, and access-control expectations defined for SaaS services?", "Are data ownership, retention, export, deletion, and privacy obligations documented?", "Is there a repeatable offboarding process for retiring a SaaS service or terminating a vendor relationship?"] },
    ],
  }),
  maturityAssessment({
    type: "cmdb-configuration", prefix: "cm", title: "CMDB & Configuration Management Assessment", shortTitle: "CMDB & Configuration", group: "Assets & Spend", scoreLabel: "CMDB Maturity Score",
    intro: "Evaluate whether your CMDB is trustworthy enough to support incidents, change, asset management, architecture, and operational decisions.",
    categories: [
      { name: "Model & Governance", recommendation: "Clarify CI scope, ownership, class standards, and governance before chasing completeness everywhere.", questions: ["Are the CI classes and relationships that matter to the business clearly defined?", "Are CMDB owners, data stewards, and class owners formally assigned?", "Are naming, lifecycle-state, required-field, and relationship standards documented?"] },
      { name: "Discovery & Population", recommendation: "Use authoritative sources and reconciliation rules instead of uncontrolled manual population.", questions: ["Are CIs populated from authoritative discovery or source systems where practical?", "Are duplicate, stale, orphaned, and conflicting CI records routinely identified?", "Are reconciliation and precedence rules defined for competing data sources?"] },
      { name: "Data Quality", recommendation: "Measure completeness, correctness, compliance, and freshness by CI class and business use case.", questions: ["Are CMDB data-quality metrics measured for completeness, accuracy, freshness, and compliance?", "Are data-quality failures assigned to owners with remediation targets?", "Can you distinguish records that are complete enough for their intended operational use?"] },
      { name: "Relationships & Services", recommendation: "Improve dependency and service relationships so the CMDB can explain impact, not just inventory.", questions: ["Are important application, infrastructure, network, and business-service relationships represented?", "Can teams use the CMDB to understand likely impact during incidents or changes?", "Are service maps and dependency relationships validated with technical and business owners?"] },
      { name: "Operational Adoption", recommendation: "Embed CMDB use into incident, change, problem, asset, security, and architecture workflows.", questions: ["Do incident and change processes consistently reference the correct CIs or services?", "Do other teams trust CMDB data enough to use it for operational decisions?", "Are CMDB issues and adoption gaps reviewed through a continual-improvement process?"] },
    ],
  }),
  maturityAssessment({
    type: "cybersecurity-foundations", prefix: "cy", title: "Cybersecurity Foundations Assessment", shortTitle: "Cybersecurity Foundations", group: "Security & Resilience", scoreLabel: "Security Maturity Score",
    intro: "A practical baseline of identity, endpoint, vulnerability, data, monitoring, and governance controls for organizations that need to know where the obvious gaps are.",
    categories: [
      { name: "Governance & Risk", recommendation: "Assign security ownership, maintain a risk register, and define minimum controls appropriate to the business.", questions: ["Is cybersecurity ownership clearly assigned with executive visibility?", "Are material cyber risks documented, prioritized, and reviewed with business leadership?", "Are baseline security policies and minimum technical standards documented and enforced?"] },
      { name: "Identity & Access", recommendation: "Prioritize MFA, privileged-access control, lifecycle governance, and rapid removal of stale access.", questions: ["Is MFA enforced for workforce access to important systems and cloud services?", "Are privileged and administrative accounts separately controlled and periodically reviewed?", "Are joiner, mover, and leaver access changes completed through a defined process?"] },
      { name: "Endpoint & Vulnerability", recommendation: "Establish managed endpoint coverage, patching, vulnerability prioritization, and unsupported-asset remediation.", questions: ["Are corporate endpoints centrally managed with security configuration and health visibility?", "Are security patches and critical vulnerabilities remediated to defined timelines?", "Can you identify unsupported, unmanaged, or high-risk devices and systems?"] },
      { name: "Data & Resilience", recommendation: "Classify important data, protect it appropriately, and validate recoverability through tested backups.", questions: ["Are sensitive and business-critical data types identified with appropriate protection requirements?", "Are backups protected from the same compromise that could affect production systems?", "Are restoration procedures tested often enough to prove critical data can be recovered?"] },
      { name: "Monitoring & Response", recommendation: "Define actionable monitoring, escalation, incident-response roles, and evidence-retention expectations.", questions: ["Are security-relevant events monitored with clear alert ownership and escalation paths?", "Is there a documented incident-response process with named decision makers and contacts?", "Are security incidents and near misses reviewed to improve controls and detection?"] },
    ],
  }),
  maturityAssessment({
    type: "identity-access-management", prefix: "ia", title: "Identity & Access Management Assessment", shortTitle: "Identity & Access", group: "Security & Resilience", scoreLabel: "IAM Maturity Score",
    intro: "Measure how well identity lifecycle, MFA, privilege, access reviews, service accounts, and authentication are governed.",
    categories: [
      { name: "Identity Lifecycle", recommendation: "Automate and govern joiner, mover, and leaver events from authoritative identity sources.", questions: ["Are identities created from an authoritative HR or business source rather than ad hoc requests?", "Are role or department changes reflected in access within a defined timeframe?", "Are terminated-user accounts and sessions disabled promptly and consistently?"] },
      { name: "Authentication", recommendation: "Standardize SSO, MFA, conditional access, and strong recovery processes across important services.", questions: ["Is MFA required for important workforce and administrative access?", "Is SSO used broadly enough to reduce unmanaged standalone credentials?", "Are authentication recovery and break-glass processes controlled and tested?"] },
      { name: "Authorization & Reviews", recommendation: "Define role models and recurring access certifications for sensitive and high-value systems.", questions: ["Are access permissions based on documented roles, responsibilities, or approved exceptions?", "Are sensitive-system access rights periodically reviewed by accountable owners?", "Are toxic combinations or excessive access identified and remediated?"] },
      { name: "Privileged Access", recommendation: "Separate, protect, monitor, and time-limit administrative access wherever possible.", questions: ["Are privileged accounts separate from normal user accounts?", "Are administrative credentials stored and rotated through controlled mechanisms?", "Is privileged activity logged, reviewed, or constrained through just-in-time or approval controls?"] },
      { name: "Non-Human Identities", recommendation: "Inventory service accounts, API keys, certificates, and machine identities with owners and rotation rules.", questions: ["Can you identify service accounts, API keys, certificates, and other non-human identities?", "Does each non-human identity have an owner, purpose, scope, and lifecycle expectation?", "Are secrets and credentials rotated, revoked, and monitored through a defined process?"] },
    ],
  }),
  maturityAssessment({
    type: "vulnerability-management", prefix: "vu", title: "Vulnerability Management Assessment", shortTitle: "Vulnerability Management", group: "Security & Resilience", scoreLabel: "Vulnerability Maturity Score",
    intro: "Evaluate asset coverage, scanning, prioritization, remediation, exception handling, and executive visibility across vulnerability management.",
    categories: [
      { name: "Coverage & Discovery", recommendation: "Improve asset coverage and ownership before tuning scanners or severity thresholds.", questions: ["Can vulnerability tooling see the systems, endpoints, cloud assets, and applications that matter?", "Are newly deployed assets brought into vulnerability coverage quickly?", "Can scan coverage gaps be identified and assigned to owners?"] },
      { name: "Assessment Quality", recommendation: "Standardize authenticated scanning, validation, and tooling coverage for relevant technologies.", questions: ["Are authenticated or otherwise high-confidence scans used where practical?", "Are false positives and scanner limitations documented and managed?", "Are external, internal, cloud, application, and endpoint exposures assessed at appropriate frequencies?"] },
      { name: "Prioritization", recommendation: "Use exploitability, asset criticality, exposure, and business context rather than CVSS alone.", questions: ["Are vulnerabilities prioritized using more than raw severity score?", "Do asset criticality and internet exposure influence remediation priority?", "Are actively exploited or high-likelihood vulnerabilities fast-tracked?"] },
      { name: "Remediation & Exceptions", recommendation: "Define remediation SLAs, accountable owners, compensating controls, and time-bound exceptions.", questions: ["Are remediation timelines defined by risk level and asset type?", "Can each overdue vulnerability be traced to an accountable owner or approved exception?", "Are exceptions time-limited, risk accepted, and periodically revalidated?"] },
      { name: "Measurement & Improvement", recommendation: "Track aging, recurrence, coverage, SLA performance, and root causes instead of total finding counts.", questions: ["Are meaningful vulnerability KPIs and aging trends reported to management?", "Are recurring vulnerabilities analyzed for systemic causes such as image, patch, or configuration problems?", "Is the vulnerability program adjusted based on incidents, exploit trends, and control performance?"] },
    ],
  }),
  maturityAssessment({
    type: "patch-management", prefix: "pm", title: "Patch Management Assessment", shortTitle: "Patch Management", group: "Security & Resilience", scoreLabel: "Patch Maturity Score",
    intro: "Measure patch visibility, testing, deployment, exceptions, emergency response, and reporting across endpoints, servers, and infrastructure.",
    categories: [
      { name: "Inventory & Scope", recommendation: "Establish patchable-asset ownership and coverage before measuring compliance percentages.", questions: ["Can you identify which managed assets are in scope for patching?", "Are operating systems, applications, firmware, and infrastructure components assigned to patch owners?", "Are unsupported or unpatchable systems explicitly tracked and risk managed?"] },
      { name: "Policy & Prioritization", recommendation: "Define severity-based timelines, maintenance expectations, and emergency-patch criteria.", questions: ["Are patch deployment timelines defined by severity and asset criticality?", "Are emergency patch conditions and decision authority documented?", "Are business-critical exceptions governed rather than informally deferred?"] },
      { name: "Testing & Deployment", recommendation: "Use representative testing rings and staged rollout with clear rollback expectations.", questions: ["Are patches tested on representative systems before broad deployment where appropriate?", "Are deployments phased or ring-based to reduce blast radius?", "Are rollback or recovery procedures available for failed patch deployments?"] },
      { name: "Coverage & Exceptions", recommendation: "Close gaps created by offline devices, failed installs, remote assets, and non-standard platforms.", questions: ["Can you identify assets that missed or failed a patch cycle?", "Are remote and intermittently connected devices brought back into compliance?", "Are patch exceptions documented with owners, reasons, compensating controls, and review dates?"] },
      { name: "Reporting & Improvement", recommendation: "Measure patch age and exposure by risk, not just deployment success rate.", questions: ["Are patch compliance and aging metrics reported by risk and business criticality?", "Are recurring deployment failures analyzed and corrected?", "Are lessons from incidents and vulnerability findings used to improve patch operations?"] },
    ],
  }),
  maturityAssessment({
    type: "incident-response", prefix: "ir", title: "Cyber Incident Response Assessment", shortTitle: "Incident Response", group: "Security & Resilience", scoreLabel: "Incident Response Score",
    intro: "Assess whether your organization can detect, coordinate, contain, communicate, recover, and learn from a serious cyber incident.",
    categories: [
      { name: "Plan & Roles", recommendation: "Document decision authority, roles, contacts, severity levels, and escalation paths before an incident begins.", questions: ["Is there a documented cyber incident-response plan that reflects the current organization?", "Are incident roles, executive decision makers, legal/privacy contacts, and technical leads named?", "Are incident severity levels and escalation triggers clearly defined?"] },
      { name: "Detection & Triage", recommendation: "Define who receives alerts, how incidents are declared, and what evidence must be preserved.", questions: ["Are high-value security alerts routed to people who can act on them at all required times?", "Is there a repeatable triage process for determining scope, severity, and likely impact?", "Are evidence-preservation and logging requirements understood before containment begins?"] },
      { name: "Containment & Eradication", recommendation: "Pre-authorize common containment actions and maintain current technical playbooks.", questions: ["Can responders quickly disable accounts, isolate devices, block indicators, or restrict access when needed?", "Are response playbooks maintained for common incident types such as ransomware, account takeover, or data exposure?", "Are business owners involved when containment decisions could disrupt operations?"] },
      { name: "Communication & Coordination", recommendation: "Prepare internal, customer, regulatory, insurer, law-enforcement, and vendor communication paths.", questions: ["Are internal communication channels and out-of-band alternatives defined for major incidents?", "Are legal, privacy, cyber-insurance, regulatory, and external-notification obligations understood?", "Are critical third-party and vendor contacts maintained for incident escalation?"] },
      { name: "Recovery & Learning", recommendation: "Test recovery criteria and use post-incident reviews to drive funded corrective actions.", questions: ["Are recovery criteria and business validation steps defined before systems return to service?", "Are post-incident reviews completed for significant incidents and near misses?", "Are corrective actions tracked to completion with accountable owners and deadlines?"] },
    ],
  }),
  maturityAssessment({
    type: "backup-disaster-recovery", prefix: "dr", title: "Backup & Disaster Recovery Assessment", shortTitle: "Backup & Disaster Recovery", group: "Security & Resilience", scoreLabel: "Recovery Readiness Score",
    intro: "Measure backup coverage, recoverability, resilience against ransomware, recovery objectives, and disaster-recovery testing.",
    categories: [
      { name: "Scope & Objectives", recommendation: "Align backup and recovery coverage to business RTO/RPO and service criticality.", questions: ["Are critical systems and data formally identified for backup and recovery?", "Are recovery time and recovery point objectives defined for important services?", "Are business owners involved in setting and approving recovery priorities?"] },
      { name: "Backup Coverage", recommendation: "Close gaps across SaaS, cloud, databases, endpoints, infrastructure configurations, and nontraditional data stores.", questions: ["Can you verify that all critical workloads and data sources are covered by appropriate backups?", "Are backup failures and missed jobs monitored and remediated promptly?", "Are configuration, identity, cloud, and SaaS recovery needs addressed rather than assuming providers cover them?"] },
      { name: "Backup Security", recommendation: "Use immutability, isolation, least privilege, and separate credentials to protect backups from compromise.", questions: ["Are critical backups protected from alteration or deletion by compromised production credentials?", "Are backup administration accounts separately secured and monitored?", "Are retention and offsite or geographically separate copies appropriate to business risk?"] },
      { name: "Restore Testing", recommendation: "Test representative restores and full-service recovery, not just backup job completion.", questions: ["Are file, database, system, and application restores tested on a defined schedule?", "Can teams demonstrate actual restore times against stated recovery objectives?", "Are restore failures and lessons learned tracked through remediation?"] },
      { name: "Disaster Recovery", recommendation: "Maintain dependency-aware DR plans, roles, communications, and realistic exercises.", questions: ["Are disaster-recovery procedures documented for critical services and dependencies?", "Are DR roles, decision authority, communications, and alternate facilities or cloud resources defined?", "Are DR exercises performed often enough to validate plans under realistic conditions?"] },
    ],
  }),
  maturityAssessment({
    type: "business-continuity", prefix: "bc", title: "Business Continuity Assessment", shortTitle: "Business Continuity", group: "Security & Resilience", scoreLabel: "Continuity Maturity Score",
    intro: "Evaluate business impact analysis, continuity strategies, people/process dependencies, crisis communication, and exercise discipline.",
    categories: [
      { name: "Business Impact", recommendation: "Maintain a current business impact analysis with service priorities, tolerances, and dependencies.", questions: ["Are critical business processes and services formally identified?", "Are maximum tolerable downtime, recovery priorities, and key dependencies documented?", "Is business impact information reviewed when operations, systems, vendors, or locations change?"] },
      { name: "Continuity Strategies", recommendation: "Define practical alternatives for people, locations, suppliers, communications, and technology failures.", questions: ["Are continuity strategies defined for loss of facilities, staff, technology, or key suppliers?", "Are manual workarounds or alternate operating methods documented where feasible?", "Are third-party continuity capabilities considered for critical outsourced services?"] },
      { name: "Plans & Ownership", recommendation: "Assign plan owners and maintain current, usable procedures instead of static compliance documents.", questions: ["Does each critical function have a current continuity plan with a named owner?", "Are call trees, contacts, alternate locations, and key resources kept current?", "Can employees find and use continuity procedures if normal systems are unavailable?"] },
      { name: "Crisis Communication", recommendation: "Prepare decision paths and communication templates for employees, customers, regulators, and partners.", questions: ["Are crisis leadership roles and decision authority defined?", "Are alternate communication channels available if primary systems are disrupted?", "Are customer, employee, partner, and regulatory communication responsibilities assigned?"] },
      { name: "Exercises & Improvement", recommendation: "Run scenario-based exercises and track corrective actions to completion.", questions: ["Are continuity and crisis plans exercised on a regular schedule?", "Do exercises include realistic business and technology dependencies rather than checklist walkthroughs only?", "Are exercise findings and real-event lessons tracked through remediation?"] },
    ],
  }),
  maturityAssessment({
    type: "itsm", prefix: "is", title: "IT Service Management Maturity Assessment", shortTitle: "IT Service Management", group: "Operations & Service", scoreLabel: "ITSM Maturity Score",
    intro: "Measure service ownership, incident, request, problem, change, knowledge, metrics, and continual-improvement maturity.",
    categories: [
      { name: "Service Governance", recommendation: "Define services, owners, support models, priorities, and measurable service outcomes.", questions: ["Are customer-facing and enabling IT services clearly defined with accountable owners?", "Are service priorities, support hours, escalation paths, and expectations documented?", "Are ITSM policies and process ownership reviewed through governance rather than informal practice?"] },
      { name: "Incident & Request", recommendation: "Standardize triage, priority, ownership, escalation, and fulfillment paths around customer impact.", questions: ["Are incidents categorized, prioritized, assigned, and escalated using consistent rules?", "Are common service requests delivered through defined workflows and fulfillment ownership?", "Can teams distinguish incident restoration work from request fulfillment and project work?"] },
      { name: "Problem & Change", recommendation: "Use recurring incidents and change risk to drive prevention, learning, and controlled implementation.", questions: ["Are recurring or high-impact incidents analyzed through a defined problem-management process?", "Are changes assessed for risk, impact, dependencies, testing, and rollback before implementation?", "Are emergency changes reviewed after the fact and recurring emergency patterns addressed?"] },
      { name: "Knowledge & Configuration", recommendation: "Improve knowledge reuse and trusted configuration/service context for support decisions.", questions: ["Are support procedures and known solutions captured in an actively maintained knowledge base?", "Can support teams identify the services, assets, or configuration items affected by an issue?", "Are knowledge and configuration records reviewed for accuracy and usefulness?"] },
      { name: "Metrics & Improvement", recommendation: "Measure customer outcomes, backlog health, recurrence, flow, and quality - not ticket counts alone.", questions: ["Are service metrics tied to customer experience, restoration, fulfillment, and quality outcomes?", "Are backlogs, aging, recurring demand, and bottlenecks reviewed with accountable owners?", "Is there a prioritized continual-improvement backlog based on data and stakeholder feedback?"] },
    ],
  }),
  maturityAssessment({
    type: "service-desk", prefix: "hd", title: "Service Desk & Help Desk Assessment", shortTitle: "Service Desk", group: "Operations & Service", scoreLabel: "Service Desk Score",
    intro: "Evaluate intake, triage, knowledge, staffing, escalation, customer experience, and operational measurement for your support desk.",
    categories: [
      { name: "Intake & Triage", recommendation: "Standardize channels, categorization, priorities, and ownership so work enters the queue cleanly.", questions: ["Are supported contact channels and hours clearly communicated to customers?", "Are tickets consistently categorized, prioritized, and assigned using documented rules?", "Can urgent business-impacting issues bypass normal queues through a clear escalation path?"] },
      { name: "Resolution & Escalation", recommendation: "Define ownership through resolution and make functional/vendor escalations visible and measurable.", questions: ["Does each ticket have clear ownership until resolution or accepted handoff?", "Are escalation paths defined for specialized teams, vendors, security, and management?", "Are customers kept informed when resolution takes longer than expected?"] },
      { name: "Knowledge & Self-Service", recommendation: "Capture repeatable fixes and make high-value self-service simple and searchable.", questions: ["Are common fixes and procedures documented in a maintained knowledge base?", "Can customers resolve appropriate common issues through self-service without creating a ticket?", "Are knowledge gaps identified from ticket trends and converted into new or improved articles?"] },
      { name: "People & Coverage", recommendation: "Align staffing, skills, schedules, and training to actual demand patterns.", questions: ["Is staffing aligned to ticket volume, peak periods, supported locations, and after-hours requirements?", "Are analyst skills and training plans maintained for the technologies they support?", "Are handoffs between shifts, teams, or tiers controlled so tickets do not disappear between queues?"] },
      { name: "Experience & Metrics", recommendation: "Use resolution quality, customer effort, backlog, and repeat-contact data to drive improvement.", questions: ["Are first response, resolution time, backlog aging, and reopen rates measured and reviewed?", "Is customer satisfaction or customer effort measured in a meaningful way?", "Are recurring contacts and top demand drivers used to eliminate preventable tickets?"] },
    ],
  }),
  maturityAssessment({
    type: "endpoint-management", prefix: "em", title: "Endpoint Management Assessment", shortTitle: "Endpoint Management", group: "Operations & Service", scoreLabel: "Endpoint Maturity Score",
    intro: "Assess device inventory, enrollment, configuration, patching, application delivery, security, and lifecycle control across user endpoints.",
    categories: [
      { name: "Inventory & Enrollment", recommendation: "Close gaps between purchased, assigned, active, and management-enrolled endpoint populations.", questions: ["Can you identify corporate endpoints and the users or functions responsible for them?", "Are new endpoints automatically or consistently enrolled into management tooling?", "Can unmanaged, stale, duplicate, or missing endpoints be identified and investigated?"] },
      { name: "Configuration & Compliance", recommendation: "Define baseline configurations and measure drift instead of relying on one-time build standards.", questions: ["Are security and operational configuration baselines defined by endpoint type?", "Can management tooling report whether devices comply with required configuration?", "Are configuration exceptions documented, approved, and periodically reviewed?"] },
      { name: "Patching & Applications", recommendation: "Standardize OS and application update coverage, software delivery, and failed-install remediation.", questions: ["Are operating system updates deployed and measured to defined timelines?", "Are common third-party applications patched through a managed process?", "Are application installs, removals, failures, and unauthorized software visible to support teams?"] },
      { name: "Security & Access", recommendation: "Enforce encryption, endpoint protection, least privilege, and remote security actions.", questions: ["Are endpoint protection, disk encryption, and local firewall controls centrally enforced?", "Are local administrator rights minimized and reviewed?", "Can lost or compromised devices be locked, wiped, isolated, or otherwise contained remotely?"] },
      { name: "Lifecycle & Support", recommendation: "Use refresh standards, warranty data, repair history, and recovery processes to manage total lifecycle cost.", questions: ["Are device age, warranty, support status, and refresh eligibility centrally visible?", "Are repair, replacement, loaner, and spare-device processes documented and measurable?", "Are devices reliably recovered, sanitized, and retired when employees leave or hardware reaches end of life?"] },
    ],
  }),
  maturityAssessment({
    type: "network-infrastructure", prefix: "nw", title: "Network Infrastructure Health Assessment", shortTitle: "Network Infrastructure", group: "Operations & Service", scoreLabel: "Network Maturity Score",
    intro: "Evaluate network visibility, configuration, resilience, security, monitoring, lifecycle, and operational ownership.",
    categories: [
      { name: "Inventory & Topology", recommendation: "Maintain current device inventory, topology, addressing, circuit, and ownership records.", questions: ["Can you identify active network devices, circuits, sites, and responsible owners?", "Are network diagrams and topology records current enough for troubleshooting and change planning?", "Are IP addressing, VLAN, DNS, DHCP, and circuit records centrally maintained?"] },
      { name: "Configuration & Change", recommendation: "Standardize configurations, backups, approvals, and rollback for network changes.", questions: ["Are standard network configurations and security baselines defined by device role?", "Are network configuration backups captured and recoverable?", "Are production network changes documented, reviewed, tested, and backed by rollback plans?"] },
      { name: "Resilience & Capacity", recommendation: "Identify single points of failure and measure capacity before users experience saturation.", questions: ["Are critical network paths, internet links, and core components designed with appropriate redundancy?", "Are capacity and utilization trends monitored for circuits, wireless, and core infrastructure?", "Are failover mechanisms tested rather than assumed to work?"] },
      { name: "Security & Segmentation", recommendation: "Strengthen administrative access, segmentation, firewall governance, and obsolete-protocol removal.", questions: ["Is administrative access to network infrastructure restricted, authenticated, and logged?", "Are network segmentation and firewall rules aligned to current business and security requirements?", "Are insecure, unsupported, or unnecessary protocols and services identified and removed?"] },
      { name: "Monitoring & Lifecycle", recommendation: "Centralize monitoring and lifecycle planning for faults, performance, support status, and replacement risk.", questions: ["Are availability, performance, interface errors, and device health centrally monitored?", "Are alerts routed to accountable teams with meaningful thresholds and escalation?", "Are firmware, support contracts, hardware age, and end-of-support dates tracked for network equipment?"] },
    ],
  }),
  maturityAssessment({
    type: "cloud-governance-finops", prefix: "cg", title: "Cloud Governance & FinOps Assessment", shortTitle: "Cloud Governance & FinOps", group: "Cloud & Workplace", scoreLabel: "Cloud Governance Score",
    intro: "Measure cloud ownership, account structure, security, cost allocation, optimization, architecture standards, and operational control.",
    categories: [
      { name: "Organization & Ownership", recommendation: "Define account/subscription structure, ownership, tagging, and decision authority across cloud environments.", questions: ["Are cloud accounts, subscriptions, projects, and environments organized using documented standards?", "Does every material cloud workload have an accountable business and technical owner?", "Are required tags, labels, naming, and environment classifications enforced consistently?"] },
      { name: "Security & Guardrails", recommendation: "Apply identity, logging, network, encryption, and policy guardrails centrally where practical.", questions: ["Are cloud identity and privileged-access standards consistently enforced?", "Are baseline logging, encryption, network, and security controls applied across environments?", "Are risky cloud configurations detected and routed to owners for remediation?"] },
      { name: "Cost Allocation", recommendation: "Improve ownership and allocation before attempting advanced optimization or chargeback.", questions: ["Can cloud spend be attributed to teams, products, environments, or cost centers?", "Are budgets, forecasts, and material spend variances reviewed with accountable owners?", "Are shared and unallocated costs visible rather than hidden in a central bill?"] },
      { name: "Optimization", recommendation: "Operationalize rightsizing, idle-resource cleanup, commitment planning, and architecture efficiency.", questions: ["Are idle, oversized, orphaned, or obsolete cloud resources identified regularly?", "Are reservations, savings plans, commitments, or equivalent discounts actively managed?", "Are optimization recommendations converted into owned actions with measured savings?"] },
      { name: "Operations & Architecture", recommendation: "Standardize supported architectures, backup, monitoring, lifecycle, and production-readiness controls.", questions: ["Are reference architectures or approved cloud patterns available for common workloads?", "Are backup, monitoring, incident, and disaster-recovery expectations defined for cloud services?", "Are cloud services and architectures reviewed for lifecycle, supportability, resilience, and operational ownership?"] },
    ],
  }),
  maturityAssessment({
    type: "microsoft-365-governance", prefix: "ms", title: "Microsoft 365 Governance Assessment", shortTitle: "Microsoft 365 Governance", group: "Cloud & Workplace", scoreLabel: "M365 Governance Score",
    intro: "Assess identity, Teams/SharePoint sprawl, external sharing, retention, licensing, security, and administration across Microsoft 365.",
    categories: [
      { name: "Identity & Administration", recommendation: "Harden admin roles, MFA, break-glass access, and privileged role governance.", questions: ["Are MFA and conditional-access requirements consistently applied to workforce accounts?", "Are Microsoft 365 administrative roles minimized and periodically reviewed?", "Are emergency or break-glass administrator accounts securely maintained and tested?"] },
      { name: "Teams & SharePoint Governance", recommendation: "Define workspace creation, ownership, naming, expiration, and archival standards.", questions: ["Are Teams, Microsoft 365 Groups, and SharePoint site creation rules documented and controlled?", "Does each collaboration workspace have accountable owners and a defined business purpose?", "Are inactive, abandoned, duplicate, or obsolete workspaces identified and retired?"] },
      { name: "Sharing & Data Protection", recommendation: "Control external sharing, guest lifecycle, sensitivity, retention, and data-loss risks.", questions: ["Are external sharing and guest-access policies aligned to business and security requirements?", "Are guest users and externally shared content periodically reviewed?", "Are retention, sensitivity, DLP, or equivalent data-protection controls applied where required?"] },
      { name: "Licensing & Utilization", recommendation: "Reconcile assigned licenses with role need and actual use before renewals.", questions: ["Can Microsoft 365 license assignments be compared with employee role and actual service use?", "Are unused or over-licensed accounts identified and reclaimed regularly?", "Are renewal and true-up decisions supported by utilization and entitlement data?"] },
      { name: "Operations & Compliance", recommendation: "Maintain audit, logging, recovery, configuration, and change practices appropriate to business risk.", questions: ["Are audit logs and security alerts retained and monitored at an appropriate level?", "Are critical Microsoft 365 configuration changes documented and reviewed?", "Are mailbox, OneDrive, Teams, and SharePoint recovery or retention capabilities understood and tested where needed?"] },
    ],
  }),
  maturityAssessment({
    type: "vendor-management", prefix: "ve", title: "Technology Vendor Management Assessment", shortTitle: "Vendor Management", group: "Assets & Spend", scoreLabel: "Vendor Management Score",
    intro: "Evaluate vendor ownership, due diligence, performance, risk, contract alignment, escalation, and exit readiness.",
    categories: [
      { name: "Inventory & Ownership", recommendation: "Maintain a complete vendor inventory with business owner, service, spend, criticality, and contract linkage.", questions: ["Can you identify the technology vendors currently providing material products or services?", "Does each significant vendor have a named business owner and operational owner?", "Are vendor criticality, supported services, spend, and contract relationships centrally recorded?"] },
      { name: "Selection & Due Diligence", recommendation: "Standardize technical, security, financial, legal, and operational due diligence before commitment.", questions: ["Are new technology vendors evaluated against documented business and technical requirements?", "Are security, privacy, resilience, financial, and legal risks reviewed before contract signature?", "Are material risks and exceptions formally accepted by accountable leaders?"] },
      { name: "Performance & Governance", recommendation: "Use service metrics, governance cadence, action logs, and executive escalation for strategic vendors.", questions: ["Are vendor performance and SLA results measured against agreed expectations?", "Are recurring service issues tracked through corrective actions rather than isolated tickets?", "Do critical vendors participate in regular governance or service-review meetings?"] },
      { name: "Commercial & Contract Control", recommendation: "Connect vendor performance to pricing, renewals, obligations, and negotiation strategy.", questions: ["Are contracts, renewals, notice dates, pricing terms, and obligations centrally tracked?", "Are invoice or consumption variances reviewed against contract terms?", "Are renewal decisions informed by performance, usage, risk, and alternative options?"] },
      { name: "Risk & Exit Readiness", recommendation: "Plan data return, credential ownership, transition assistance, documentation, and termination before they are urgently needed.", questions: ["Are critical vendor concentration, continuity, and dependency risks periodically reviewed?", "Does the organization independently control required accounts, credentials, data, and documentation?", "Are exit, transition, data-return, and termination requirements understood before a vendor relationship becomes difficult?"] },
    ],
  }),
  maturityAssessment({
    type: "contract-renewal-management", prefix: "cr", title: "Technology Contract & Renewal Management Assessment", shortTitle: "Contract & Renewal Management", group: "Assets & Spend", scoreLabel: "Contract Control Score",
    intro: "Find auto-renewal exposure, missing ownership, weak notice tracking, pricing surprises, and lost negotiating leverage across technology contracts.",
    categories: [
      { name: "Contract Inventory", recommendation: "Create a central contract register linked to vendors, services, owners, and spend.", questions: ["Can you identify active technology contracts, subscriptions, maintenance agreements, and leases?", "Are executed agreements, amendments, SOWs, and pricing schedules centrally accessible?", "Is each contract linked to an accountable owner, vendor, service, and cost center or budget?"] },
      { name: "Dates & Obligations", recommendation: "Track notice periods and obligations far enough ahead to preserve decision options.", questions: ["Are renewal dates, auto-renew terms, notice deadlines, and termination windows centrally tracked?", "Are key contractual obligations, minimum commitments, and true-up requirements visible to owners?", "Are alerts sent early enough for evaluation, negotiation, or replacement planning?"] },
      { name: "Commercial Review", recommendation: "Use utilization, benchmark, performance, and alternative options before renewal approval.", questions: ["Are utilization and actual business need reviewed before renewing material contracts?", "Are pricing changes, uplifts, discounts, and commitments compared with current market or alternatives?", "Are vendor performance and unresolved issues considered during commercial decisions?"] },
      { name: "Approval & Governance", recommendation: "Require accountable approvals and retain the decision record for renew, renegotiate, replace, or terminate actions.", questions: ["Are contract renewals routed through defined financial, legal, security, procurement, and owner approvals as appropriate?", "Are exceptions to standard terms or policy documented and approved?", "Can the organization show why a contract was renewed, changed, or terminated?"] },
      { name: "Exit & Transition", recommendation: "Document exit obligations, data return, transition assistance, and internal dependencies before notice deadlines.", questions: ["Are termination fees, data-return rights, transition assistance, and post-termination obligations understood?", "Are replacement or migration lead times considered before contract notice deadlines?", "Are credentials, data, documentation, and administrative control sufficiently independent of the vendor?"] },
    ],
  }),
  maturityAssessment({
    type: "technology-procurement", prefix: "tp", title: "Technology Procurement & Spend Control Assessment", shortTitle: "Technology Procurement", group: "Assets & Spend", scoreLabel: "Procurement Maturity Score",
    intro: "Assess intake, approvals, standards, vendor selection, purchase visibility, receiving, and financial control for technology spend.",
    categories: [
      { name: "Demand & Intake", recommendation: "Use a consistent intake process that captures need, owner, budget, timing, risk, and alternatives.", questions: ["Are technology purchase requests submitted through a defined intake process?", "Do requests identify business need, owner, budget, quantity, timing, and expected outcome?", "Are duplicate tools or existing standards considered before new purchases are approved?"] },
      { name: "Standards & Architecture", recommendation: "Maintain supported product standards and route exceptions through explicit review.", questions: ["Are preferred or supported hardware, software, cloud, and service standards documented?", "Are architecture, security, privacy, support, and integration implications reviewed when relevant?", "Are exceptions to standards documented with business justification and ownership?"] },
      { name: "Sourcing & Commercials", recommendation: "Use competition, benchmark, total-cost, and contract review for material purchases.", questions: ["Are significant technology purchases competitively sourced or otherwise price validated?", "Are total lifecycle costs, support, implementation, and exit costs considered beyond purchase price?", "Are commercial terms reviewed for renewal, minimum commitment, liability, data, and termination risk?"] },
      { name: "Receiving & Recordkeeping", recommendation: "Connect PO, invoice, receipt, asset/license record, owner, and deployment evidence.", questions: ["Are purchased technology assets and entitlements recorded when received or activated?", "Can purchase orders and invoices be linked to the assets, licenses, or services acquired?", "Are discrepancies between ordered, received, deployed, and billed quantities investigated?"] },
      { name: "Spend & Optimization", recommendation: "Analyze spend, supplier concentration, demand patterns, and realized savings continuously.", questions: ["Can technology spend be reported by vendor, category, business unit, and cost center?", "Are recurring purchases and fragmented supplier spend reviewed for consolidation opportunities?", "Are negotiated savings, avoided spend, and demand reductions measured after procurement decisions?"] },
    ],
  }),
  maturityAssessment({
    type: "data-governance-privacy", prefix: "dg", title: "Data Governance & Privacy Assessment", shortTitle: "Data Governance & Privacy", group: "Security & Resilience", scoreLabel: "Data Governance Score",
    intro: "Evaluate data ownership, classification, retention, access, privacy obligations, quality, lineage, and disposal practices.",
    categories: [
      { name: "Ownership & Classification", recommendation: "Assign data owners and classify sensitive and important information using a usable scheme.", questions: ["Are important data domains and data owners formally identified?", "Is data classified by sensitivity, business value, or regulatory requirement using a documented standard?", "Do employees understand how classification affects handling, sharing, and storage?"] },
      { name: "Inventory & Lineage", recommendation: "Improve visibility into where important data lives, how it moves, and which systems depend on it.", questions: ["Can the organization identify where sensitive and business-critical data is stored?", "Are material data flows, integrations, and third-party transfers documented?", "Can teams determine which systems or reports depend on key data sources?"] },
      { name: "Access & Protection", recommendation: "Align access, encryption, sharing, and monitoring controls to data sensitivity and business need.", questions: ["Is access to sensitive data limited to approved roles and periodically reviewed?", "Are encryption and secure-transfer requirements applied where appropriate?", "Are unusual access, bulk export, or unauthorized sharing risks monitored or controlled?"] },
      { name: "Retention & Privacy", recommendation: "Map retention, deletion, legal hold, privacy rights, and third-party obligations to real systems.", questions: ["Are retention and deletion requirements documented for important data categories?", "Can the organization execute privacy, legal-hold, or data-subject requests across relevant systems?", "Are third-party data-processing and cross-border obligations documented and reviewed?"] },
      { name: "Quality & Accountability", recommendation: "Measure material data-quality issues and assign owners for correction and prevention.", questions: ["Are critical data-quality dimensions such as completeness, accuracy, and timeliness defined?", "Are material data-quality issues assigned to owners and tracked through remediation?", "Are governance metrics and recurring data risks reviewed with business leadership?"] },
    ],
  }),
  maturityAssessment({
    type: "ai-governance", prefix: "ai", title: "AI Readiness & Governance Assessment", shortTitle: "AI Readiness & Governance", group: "Strategy & Delivery", scoreLabel: "AI Readiness Score",
    intro: "Assess whether your organization is ready to adopt AI responsibly across use cases, data, security, human oversight, vendors, and value measurement.",
    categories: [
      { name: "Strategy & Use Cases", recommendation: "Prioritize bounded, measurable AI use cases tied to real business outcomes and accountable owners.", questions: ["Are AI use cases prioritized based on specific business problems rather than general experimentation?", "Does each material AI initiative have an accountable business owner and measurable outcome?", "Are high-risk or prohibited AI use cases explicitly identified?"] },
      { name: "Data & Knowledge", recommendation: "Improve data quality, permissions, provenance, and knowledge curation before scaling AI dependence.", questions: ["Is the data or knowledge used by AI sufficiently accurate, current, and permissioned for the intended use?", "Can teams identify the source and ownership of important information supplied to AI systems?", "Are sensitive, confidential, or regulated data handling rules defined for AI use?"] },
      { name: "Security & Privacy", recommendation: "Apply identity, data-loss, vendor, logging, and model-access controls proportionate to AI risk.", questions: ["Are approved AI tools and models reviewed for security, privacy, and data-use terms?", "Are employees told what data may or may not be entered into external AI services?", "Are access, logging, retention, and integration controls applied to higher-risk AI applications?"] },
      { name: "Human Oversight & Risk", recommendation: "Define where humans must review outputs, how errors are escalated, and who accepts residual risk.", questions: ["Are AI-generated outputs reviewed by humans when errors could materially affect people, money, safety, or compliance?", "Are accuracy, bias, hallucination, explainability, and misuse risks considered before deployment?", "Is there a process for reporting, investigating, and correcting harmful or incorrect AI behavior?"] },
      { name: "Operations & Value", recommendation: "Track model/vendor changes, cost, quality, adoption, and realized business value over time.", questions: ["Are AI applications monitored for output quality, failure modes, cost, and user adoption after launch?", "Are vendor/model changes evaluated for impact on behavior, security, or data handling?", "Can the organization demonstrate realized value from AI investments rather than usage alone?"] },
    ],
  }),
  maturityAssessment({
    type: "automation-readiness", prefix: "au", title: "Business & IT Automation Readiness Assessment", shortTitle: "Automation Readiness", group: "Strategy & Delivery", scoreLabel: "Automation Readiness Score",
    intro: "Find where automation will help, where broken processes should be fixed first, and whether ownership, data, controls, and support are ready.",
    categories: [
      { name: "Process Suitability", recommendation: "Automate stable, repeatable, high-volume work with clear inputs, outputs, and exception paths.", questions: ["Are candidate processes documented well enough to understand steps, decisions, exceptions, and handoffs?", "Are high-volume, repetitive, delay-prone, or error-prone tasks identified for automation?", "Are process problems corrected before automating unnecessary or broken work?"] },
      { name: "Ownership & Governance", recommendation: "Assign business owners and define approval, risk, change, and lifecycle responsibilities for automations.", questions: ["Does each automation candidate have an accountable business process owner?", "Are approval and risk requirements defined before an automation can modify production data or systems?", "Are ownership and support responsibilities defined for automations after launch?"] },
      { name: "Data & Integration", recommendation: "Stabilize source data, interfaces, credentials, and error handling before scaling automation.", questions: ["Are the required source data and system interfaces reliable enough for automation?", "Are APIs or supported integration methods preferred over fragile screen-scraping where practical?", "Are credentials, service accounts, and secrets managed securely for automated processes?"] },
      { name: "Testing & Controls", recommendation: "Use test cases, audit logs, exception handling, rollback, and human approval where risk requires it.", questions: ["Are normal, boundary, and failure conditions tested before automation goes live?", "Can automated actions be traced through logs or transaction history?", "Are exception handling, manual fallback, and rollback procedures defined?"] },
      { name: "Value & Improvement", recommendation: "Measure time saved, quality, cycle time, risk reduction, and maintenance cost after deployment.", questions: ["Are expected benefits defined before automation work begins?", "Are realized time savings, error reduction, throughput, or customer outcomes measured after launch?", "Are automations reviewed for breakage, changing business rules, and retirement when no longer valuable?"] },
    ],
  }),
  maturityAssessment({
    type: "change-management", prefix: "ch", title: "Technology Change Management Assessment", shortTitle: "Change Management", group: "Strategy & Delivery", scoreLabel: "Change Maturity Score",
    intro: "Evaluate whether production changes are risk assessed, tested, approved, communicated, recoverable, and improved through evidence.",
    categories: [
      { name: "Intake & Classification", recommendation: "Classify changes by risk and type so governance effort matches potential impact.", questions: ["Are production changes recorded before implementation except for defined emergencies?", "Are standard, normal, and emergency changes classified using documented criteria?", "Are change risk, business impact, affected services, and dependencies captured consistently?"] },
      { name: "Planning & Testing", recommendation: "Require appropriate testing, implementation steps, validation, and rollback for risky changes.", questions: ["Are implementation and validation steps documented for material changes?", "Is testing evidence proportionate to the risk and complexity of the change?", "Are rollback or recovery plans documented for changes that could disrupt service?"] },
      { name: "Approval & Scheduling", recommendation: "Use accountable approvals, conflict review, freeze periods, and maintenance windows based on risk.", questions: ["Are change approvals performed by people with appropriate technical and business authority?", "Are conflicting changes, maintenance windows, blackout periods, and business events considered before scheduling?", "Can low-risk repeatable changes use streamlined approval without bypassing accountability?"] },
      { name: "Communication & Execution", recommendation: "Make stakeholder communication, ownership, and go/no-go criteria explicit before implementation.", questions: ["Are affected users, support teams, and business owners notified appropriately before significant changes?", "Is one person accountable for coordinating each material change through completion?", "Are success criteria and go/no-go decision points understood before execution begins?"] },
      { name: "Review & Improvement", recommendation: "Use change success, incidents, emergency usage, and failed changes to improve engineering and governance.", questions: ["Are failed or high-impact changes reviewed to identify root causes and corrective actions?", "Are change success, failure, rollback, and emergency-change trends measured?", "Are recurring low-risk successful changes converted into standardized automation or standard-change patterns?"] },
    ],
  }),
  maturityAssessment({
    type: "project-delivery", prefix: "pj", title: "Technology Project Delivery Assessment", shortTitle: "Project Delivery", group: "Strategy & Delivery", scoreLabel: "Delivery Maturity Score",
    intro: "Assess project definition, ownership, planning, dependency control, risk, stakeholder engagement, acceptance, and transition into operations.",
    categories: [
      { name: "Definition & Sponsorship", recommendation: "Define outcomes, scope, sponsor authority, success measures, and decision rights before execution accelerates.", questions: ["Is the business outcome and reason for the project clearly documented?", "Are in-scope and out-of-scope deliverables understood by stakeholders?", "Is there an active sponsor with authority to resolve priority, funding, and risk decisions?"] },
      { name: "Plan & Ownership", recommendation: "Assign accountable owners, realistic milestones, dependencies, resources, and decision points.", questions: ["Does the project have a realistic plan with milestones, owners, dependencies, and critical-path activities?", "Are responsibilities clearly divided across internal teams, vendors, and business stakeholders?", "Are resource constraints and competing commitments reflected in the delivery plan?"] },
      { name: "Risk & Dependency", recommendation: "Maintain live risk, issue, decision, and dependency registers with owners and escalation dates.", questions: ["Are project risks and issues documented with owners, impact, mitigation, and due dates?", "Are technical, business, vendor, data, and integration dependencies actively managed?", "Are material decisions recorded so teams understand what was decided and why?"] },
      { name: "Stakeholders & Change", recommendation: "Engage affected users early and plan communications, training, process change, and adoption.", questions: ["Are affected business and operational stakeholders involved throughout delivery rather than only at launch?", "Are communication, training, and process-change needs identified before go-live?", "Are stakeholder concerns and adoption risks tracked and resolved?"] },
      { name: "Acceptance & Transition", recommendation: "Define acceptance, cutover, support, documentation, and ownership before project closure.", questions: ["Are measurable acceptance criteria defined before final testing or launch?", "Are cutover, rollback, hypercare, and support responsibilities documented?", "Are documentation, ownership, metrics, and outstanding risks formally transitioned into steady-state operations?"] },
    ],
  }),
  maturityAssessment({
    type: "application-portfolio", prefix: "ap", title: "Application Portfolio Rationalization Assessment", shortTitle: "Application Portfolio", group: "Strategy & Delivery", scoreLabel: "Portfolio Maturity Score",
    intro: "Evaluate application inventory, ownership, cost, risk, duplication, business value, lifecycle, and rationalization discipline.",
    categories: [
      { name: "Inventory & Ownership", recommendation: "Build a trusted application inventory with business owner, technical owner, users, dependencies, and lifecycle state.", questions: ["Can you identify the applications currently used to run the business?", "Does each material application have a named business owner and technical owner?", "Are application purpose, user population, criticality, and lifecycle status recorded?"] },
      { name: "Cost & Contracts", recommendation: "Connect applications to license, infrastructure, support, vendor, and internal operating costs.", questions: ["Can you estimate the total recurring cost of material applications beyond license price alone?", "Are related contracts, renewals, infrastructure, support, and vendor dependencies linked to applications?", "Are significant cost increases or low-utilization applications identified for review?"] },
      { name: "Business Value & Fit", recommendation: "Assess business value, user satisfaction, functional fit, and strategic alignment consistently.", questions: ["Are applications periodically evaluated for business value and functional fit?", "Is user adoption or satisfaction considered when evaluating application value?", "Are applications aligned to current business capabilities and technology strategy?"] },
      { name: "Risk & Technical Health", recommendation: "Measure supportability, security, technical debt, resilience, and key-person/vendor dependency.", questions: ["Are end-of-life, unsupported, insecure, or technically fragile applications identified?", "Are critical application dependencies, integrations, and recovery requirements documented?", "Are single-vendor, single-person, or obsolete-technology dependencies treated as portfolio risk?"] },
      { name: "Rationalization & Roadmap", recommendation: "Use evidence to decide invest, tolerate, migrate, consolidate, replace, or retire - then track execution.", questions: ["Are duplicate or overlapping applications identified by business capability?", "Are formal disposition decisions made for applications that should be invested in, replaced, consolidated, or retired?", "Is there a funded roadmap with owners and dates for material portfolio changes?"] },
    ],
  }),
  maturityAssessment({
    type: "technology-lifecycle", prefix: "tl", title: "Technology Lifecycle & End-of-Life Assessment", shortTitle: "Technology Lifecycle", group: "Assets & Spend", scoreLabel: "Lifecycle Maturity Score",
    intro: "Measure visibility and control over aging hardware, software, support status, warranties, technical debt, and replacement planning.",
    categories: [
      { name: "Lifecycle Visibility", recommendation: "Maintain manufacturer/vendor lifecycle dates and support status alongside owned technology records.", questions: ["Can you identify the age and support status of important hardware and software?", "Are end-of-sale, end-of-support, warranty, maintenance, and subscription dates centrally tracked?", "Can lifecycle data be linked to owners, locations, services, or applications affected?"] },
      { name: "Standards & Policy", recommendation: "Define supported versions, refresh standards, exception criteria, and ownership by technology class.", questions: ["Are supported hardware models, operating systems, software versions, and infrastructure standards documented?", "Are expected refresh or replacement cycles defined for major technology classes?", "Are exceptions to lifecycle standards documented and risk accepted?"] },
      { name: "Risk & Prioritization", recommendation: "Prioritize replacement using business criticality, security, failure risk, and supportability.", questions: ["Are unsupported or end-of-life technologies treated as explicit operational or security risks?", "Are lifecycle risks prioritized using business criticality and dependency context?", "Can the organization identify single points of failure created by obsolete technology?"] },
      { name: "Planning & Budget", recommendation: "Convert lifecycle exposure into multi-year replacement forecasts before failures force emergency spending.", questions: ["Is lifecycle data used to forecast replacement demand and future technology spend?", "Are major refresh programs planned far enough ahead for procurement, deployment, and migration?", "Are deferred replacements visible to leadership as quantified risk rather than hidden backlog?"] },
      { name: "Retirement & Disposal", recommendation: "Close the lifecycle with secure removal, data handling, license updates, asset-record closure, and evidence.", questions: ["Are retired systems and assets removed from production through a defined decommission process?", "Are data sanitization, disposal, recycling, and chain-of-custody requirements documented?", "Are asset, CMDB, license, monitoring, backup, and financial records updated when technology is retired?"] },
    ],
  }),
  maturityAssessment({
    type: "managed-print", prefix: "mp", title: "Print Fleet & Managed Print Assessment", shortTitle: "Print Fleet & MPS", group: "Assets & Spend", scoreLabel: "Print Management Score",
    intro: "Evaluate printer fleet visibility, standardization, cost, supplies, security, support, contracts, and optimization opportunities.",
    categories: [
      { name: "Fleet Visibility", recommendation: "Create a reconciled printer/MFP inventory with location, model, owner, network identity, volume, and lifecycle state.", questions: ["Can you identify active printers and MFPs by site, model, serial number, and network identity?", "Are device ownership, department, location, support status, and lifecycle data current?", "Can unmanaged, duplicate, offline, or unknown print devices be identified and investigated?"] },
      { name: "Standards & Deployment", recommendation: "Standardize device models, placement criteria, print queues, drivers, and configuration where practical.", questions: ["Are approved device models and placement standards defined for common business needs?", "Are print drivers, queues, naming, and deployment methods centrally governed?", "Are local exceptions and specialty print requirements documented rather than becoming uncontrolled fleet growth?"] },
      { name: "Cost & Utilization", recommendation: "Use device volume, cost per page, supplies, lease, service, and energy data to optimize fleet size and placement.", questions: ["Can print volumes and utilization be measured by device, site, or department?", "Are lease, service, supply, and consumable costs visible enough to calculate true fleet cost?", "Are low-utilization, high-cost, redundant, or poorly placed devices identified for consolidation?"] },
      { name: "Security & Compliance", recommendation: "Harden device configuration, admin access, firmware, secure print, data storage, and network exposure.", questions: ["Are printer and MFP administrator credentials changed from defaults and centrally controlled?", "Are firmware, insecure protocols, network exposure, and embedded storage risks actively managed?", "Are secure-print, authentication, or data-handling controls used where sensitive output requires them?"] },
      { name: "Vendor & Support", recommendation: "Measure SLA performance, consumable fulfillment, break/fix quality, contract terms, and exit readiness.", questions: ["Are service response, uptime, supplies, meter, and support expectations measured against vendor commitments?", "Are leases, renewals, device return terms, pricing, and termination obligations centrally tracked?", "Can the organization transition vendors without losing print configuration, fleet data, administrative access, or documentation?"] },
    ],
  }),
  maturityAssessment({
    type: "documentation-knowledge", prefix: "dk", title: "IT Documentation & Knowledge Management Assessment", shortTitle: "Documentation & Knowledge", group: "Operations & Service", scoreLabel: "Knowledge Maturity Score",
    intro: "Measure whether operational knowledge is current, findable, owned, reusable, and resilient to turnover or vendor change.",
    categories: [
      { name: "Coverage & Standards", recommendation: "Define what must be documented, at what level, using consistent templates and ownership.", questions: ["Are documentation standards defined for systems, services, procedures, integrations, and support operations?", "Are critical environments documented deeply enough that another qualified person could operate them?", "Are required diagrams, runbooks, contacts, credentials references, and recovery procedures identified by service type?"] },
      { name: "Ownership & Maintenance", recommendation: "Assign owners and review triggers so documentation changes with the environment.", questions: ["Does each important document or knowledge area have a named owner?", "Are documents reviewed when systems, vendors, processes, or responsibilities change?", "Are stale or conflicting versions identified and removed rather than remaining equally discoverable?"] },
      { name: "Findability & Access", recommendation: "Use a small number of authoritative repositories with search, permissions, and sensible information architecture.", questions: ["Can staff quickly locate the current procedure or architecture document they need?", "Are documentation repositories organized consistently rather than scattered across individual drives and inboxes?", "Are access controls appropriate without making operational knowledge unnecessarily difficult to reach?"] },
      { name: "Knowledge Capture", recommendation: "Capture fixes, decisions, recurring incidents, onboarding knowledge, and vendor expertise before it disappears.", questions: ["Are repeatable solutions and known errors captured from support and incident work?", "Are architecture and operational decisions recorded with rationale and date?", "Is knowledge transfer required during employee transitions, vendor changes, and major projects?"] },
      { name: "Use & Improvement", recommendation: "Measure reuse, gaps, search failures, and document quality through real operational work.", questions: ["Do support and engineering teams routinely use documented procedures rather than relying on tribal knowledge?", "Are documentation gaps identified from incidents, escalations, onboarding, and audits?", "Are high-value knowledge improvements prioritized and tracked to completion?"] },
    ],
  }),
  maturityAssessment({
    type: "audit-compliance-readiness", prefix: "ac", title: "Technology Audit & Compliance Readiness Assessment", shortTitle: "Audit & Compliance Readiness", group: "Strategy & Delivery", scoreLabel: "Audit Readiness Score",
    intro: "Assess control ownership, evidence quality, repeatability, exception management, remediation, and readiness for customer, internal, or regulatory audits.",
    categories: [
      { name: "Control Ownership", recommendation: "Assign accountable control owners and map requirements to actual systems, processes, and evidence.", questions: ["Are technology control requirements mapped to named owners and responsible teams?", "Do control owners understand the specific outcome each control is expected to demonstrate?", "Are overlapping frameworks or customer requirements mapped to common controls where practical?"] },
      { name: "Evidence & Repeatability", recommendation: "Design evidence collection into normal operations instead of reconstructing it during audit season.", questions: ["Can required evidence be produced consistently without extensive manual reconstruction?", "Are evidence sources, retention periods, and collection procedures documented?", "Can the organization distinguish current valid evidence from screenshots or exports with unclear provenance?"] },
      { name: "Testing & Exceptions", recommendation: "Test control effectiveness periodically and govern exceptions with time limits and risk acceptance.", questions: ["Are key controls periodically tested for both design and operating effectiveness?", "Are control failures and exceptions documented with owners and remediation dates?", "Are compensating controls and risk acceptance formally approved when requirements cannot be met directly?"] },
      { name: "Remediation & Tracking", recommendation: "Track findings through root cause, corrective action, validation, and closure.", questions: ["Are audit, assessment, and control findings centrally tracked to accountable owners?", "Are remediation plans specific enough to show deliverables, dependencies, dates, and expected evidence?", "Is closure validated rather than based only on owner attestation?"] },
      { name: "Readiness & Governance", recommendation: "Maintain an audit calendar, scope knowledge, stakeholder roles, and reusable evidence packs.", questions: ["Are upcoming audits, customer assessments, certifications, and reporting deadlines centrally visible?", "Are audit-response roles, communication paths, and approval authority defined before fieldwork begins?", "Are recurring audit themes reviewed by leadership to drive systemic improvement?"] },
    ],
  }),
  maturityAssessment({
    type: "small-business-technology-health", prefix: "sb", title: "Small Business Technology Health Assessment", shortTitle: "Small Business Technology Health", group: "Strategy & Delivery", scoreLabel: "Technology Health Score",
    intro: "A plain-language assessment for small businesses covering accounts, devices, backups, vendors, costs, documentation, and operational resilience.",
    categories: [
      { name: "Accounts & Access", recommendation: "Start with MFA, shared-account cleanup, admin ownership, and immediate offboarding when people leave.", questions: ["Do important business accounts require multi-factor authentication?", "Can you identify who has administrator access to email, websites, banking-related systems, cloud tools, and business applications?", "Is access removed promptly when employees, contractors, or vendors leave?"] },
      { name: "Devices & Security", recommendation: "Know which devices matter, keep them updated, use endpoint protection, and remove unsupported equipment.", questions: ["Can you identify the computers and other devices used to run the business?", "Are operating systems and common applications kept reasonably up to date?", "Are business devices protected with encryption, endpoint security, and secure login controls?"] },
      { name: "Backups & Continuity", recommendation: "Protect the data that would stop the business and prove it can actually be restored.", questions: ["Is important business data backed up automatically to a separate protected location?", "Have you tested restoring important files or systems from backup?", "Could the business continue basic operations if internet, email, a key computer, or a primary software provider were unavailable for a day?"] },
      { name: "Vendors & Costs", recommendation: "Keep a simple vendor/subscription list with owners, renewal dates, costs, and cancellation instructions.", questions: ["Can you list the software subscriptions and technology vendors the business is currently paying for?", "Are renewal dates, recurring charges, and contract commitments visible before they renew?", "Are unused accounts, duplicate tools, or unnecessary subscriptions reviewed and cancelled?"] },
      { name: "Documentation & Ownership", recommendation: "Document the basics so the business is not dependent on one employee or outside vendor knowing everything.", questions: ["Are key passwords or recovery methods stored securely somewhere the business controls?", "Are important technology contacts, account owners, procedures, and system details documented?", "Could another trusted person take over basic technology operations if the usual person became unavailable?"] },
    ],
  }),
];

export const assessments: Record<AssessmentType, AssessmentDefinition> = {
  "vendor-migration": vendorMigrationAssessment,
  itam: itamAssessment,
  ...Object.fromEntries(additionalAssessments.map((assessment) => [assessment.type, assessment])),
};

export const assessmentGroups = [
  "Strategy & Delivery",
  "Security & Resilience",
  "Operations & Service",
  "Assets & Spend",
  "Cloud & Workplace",
] as const;

const recommendationCopy: Record<string, Record<string, string>> = {
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

  if (score <= 20) return ["Level 1 — Reactive", "Controls are mostly informal, inconsistent, or dependent on individual knowledge. Start with ownership, minimum standards, and visibility."] as const;
  if (score <= 40) return ["Level 2 — Developing", "Some processes and tools exist, but coverage and execution are inconsistent. Focus on standardization and clear accountability."] as const;
  if (score <= 60) return ["Level 3 — Controlled", "Core practices are established. The next gains come from integration, measurement, evidence quality, and consistency across teams."] as const;
  if (score <= 80) return ["Level 4 — Managed", "The capability is governed and measured, with defined ownership and repeatable controls. Optimization and automation are the next opportunities."] as const;
  return ["Level 5 — Optimized", "The capability is mature, measured, integrated, and actively improved using data, business outcomes, and recurring review."] as const;
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
    text: definition.categoryRecommendations?.[category] || recommendationCopy[type]?.[category] || `Strengthen ${category} with defined ownership, documented controls, measurable evidence, and a recurring review cycle.`,
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
