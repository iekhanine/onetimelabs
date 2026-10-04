import { assessments, type AssessmentType } from "@/lib/assessments";

type GuideContent = {
  suggestedAnswer: string;
  evidence: string;
  talkingPoints: string[];
  followUps: string[];
};

export type ConsultationGuideItem = GuideContent & {
  questionId: string;
  category: string;
  assessmentQuestion: string;
  assessmentAnswer: string;
  assessmentAnswerLabel: string;
  priority: "critical" | "high" | "medium" | "validation";
  consultantPrompt: string;
};

const guide: Record<string, GuideContent> = {
  vm01: {
    suggestedAnswer: "Yes. The migration has a written business case with agreed outcomes, constraints, success measures, and an executive owner.",
    evidence: "Business case, project charter, approved objectives, success metrics, executive sponsor approval.",
    followUps: ["What business outcome is forcing the migration now?", "How will leadership know the migration delivered the intended value?"],
    talkingPoints: ["A technical migration without a business definition of success tends to optimize the wrong things.", "Use the business reason to resolve scope, cost, downtime, and priority trade-offs."],
  },
  vm02: {
    suggestedAnswer: "Yes. In-scope and out-of-scope systems, services, sites, assets, applications, users, data, integrations, and vendors are explicitly documented.",
    evidence: "Approved scope document, asset/workload list, site list, application list, exclusions, change-control record.",
    followUps: ["What is explicitly out of scope?", "How do you handle newly discovered systems or locations after scope approval?"],
    talkingPoints: ["Unclear scope creates surprise work, budget pressure, and arguments during cutover.", "Treat scope changes as governed decisions, not informal additions."],
  },
  vm03: {
    suggestedAnswer: "Yes. Each workstream has one accountable owner with authority, named backups, deliverables, dates, and escalation paths.",
    evidence: "RACI/RASCI, workstream owner list, project plan, escalation matrix.",
    followUps: ["Who owns each major workstream and can make decisions when something is blocked?", "What happens if that owner is unavailable during cutover?"],
    talkingPoints: ["Shared responsibility often becomes no responsibility.", "One accountable owner per outcome speeds decisions and reduces handoff failures."],
  },
  vm04: {
    suggestedAnswer: "Yes. Customer, incumbent, and incoming vendor responsibilities are documented down to deliverables, dependencies, approvals, and handoff points.",
    evidence: "RACI, transition agreement, SOWs, exit plan, responsibility matrix, vendor meeting minutes.",
    followUps: ["Which activities are currently assumed rather than contractually or operationally assigned?", "Where could the incumbent and incoming vendor each believe the other owns the same task?"],
    talkingPoints: ["Vendor transitions fail in the seams between contracts.", "Explicitly assign discovery, exports, credentials, documentation, testing, and post-cutover support."],
  },
  vm05: {
    suggestedAnswer: "Yes. Executive sponsors and affected business owners participate in planning, approve risk, and are available for go/no-go decisions.",
    evidence: "Steering committee cadence, sponsor attendance, decision log, risk acceptance, business owner sign-off.",
    followUps: ["Which business leaders can accept downtime or operational risk?", "Who has final go/no-go authority?"],
    talkingPoints: ["Technical teams should not be left to accept business risk on behalf of the organization.", "Business stakeholders need visibility before cutover, not after disruption."],
  },
  vm06: {
    suggestedAnswer: "Yes. The migration inventory is current, validated against multiple sources, owned, and includes identifiers needed to reconcile every in-scope item.",
    evidence: "Validated inventory export, discovery results, CMDB/asset reconciliation, site survey, exception list.",
    followUps: ["How was the inventory validated and against which source systems?", "What percentage of the estate is unknown, stale, duplicated, or disputed?"],
    talkingPoints: ["You cannot safely migrate what you cannot reliably identify.", "Inventory quality directly affects sequencing, cost, outage risk, and acceptance."],
  },
  vm07: {
    suggestedAnswer: "Yes. Legacy, unsupported, orphaned, and undocumented technology is identified with a disposition: remediate, replace, isolate, retire, or accept risk.",
    evidence: "Legacy/EOL register, technical debt list, exception approvals, retirement plan.",
    followUps: ["Which legacy systems cannot move cleanly to the target environment?", "Who decides whether each exception is remediated, retired, or accepted?"],
    talkingPoints: ["A migration exposes years of hidden technical debt.", "Do not blindly migrate obsolete problems into the new environment."],
  },
  vm08: {
    suggestedAnswer: "Yes. Current configurations, workflows, integrations, operating procedures, and business processes are documented to the level needed to recreate and support them.",
    evidence: "Architecture/configuration docs, workflow diagrams, runbooks, screenshots/exports, SME validation.",
    followUps: ["Which parts of the environment still depend on tribal knowledge?", "Could a new team rebuild or support the service from the documentation alone?"],
    talkingPoints: ["Documentation is a migration dependency, not an after-action item.", "If the incumbent is the documentation, the organization does not own its environment."],
  },
  vm09: {
    suggestedAnswer: "Yes. Contracts, SLAs, renewals, termination clauses, notice periods, data-return obligations, support terms, and financial commitments are centrally understood.",
    evidence: "Contract register, SOW/MSA, SLA documents, renewal calendar, termination notices, procurement/legal review.",
    followUps: ["What notice periods or exit obligations could affect the schedule?", "Are there fees, auto-renewals, data-return clauses, or support dependencies that change the plan?"],
    talkingPoints: ["Technical readiness does not override contractual obligations.", "Commercial timing can become a critical-path dependency just like technology."],
  },
  vm10: {
    suggestedAnswer: "Yes. The organization independently controls or can recover every required admin account, service account, key, certificate, license portal, API credential, and privileged access path.",
    evidence: "Privileged access inventory, credential escrow, certificate inventory, license portal ownership, break-glass process.",
    followUps: ["Which credentials or portals are still controlled by the incumbent vendor?", "If the incumbent stopped cooperating today, what would you be unable to administer?"],
    talkingPoints: ["Vendor-controlled access is one of the most dangerous exit dependencies.", "Recover administrative control before the relationship becomes adversarial or time-constrained."],
  },
  vm11: {
    suggestedAnswer: "Yes. Technical dependencies are mapped and validated with owners, including network, identity, data, APIs, DNS, certificates, shared infrastructure, and third parties.",
    evidence: "Dependency maps, discovery tooling, architecture diagrams, flow logs, SME validation, dependency register.",
    followUps: ["Which dependencies would break if this workload moved by itself?", "How were automated discovery results validated with application and business owners?"],
    talkingPoints: ["Dependencies determine migration waves and cutover order.", "The dangerous dependency is usually the undocumented one that everybody assumes somebody else knows about."],
  },
  vm12: {
    suggestedAnswer: "Yes. Mission-critical business workflows, upstream/downstream processes, owners, downtime tolerance, and operating windows are documented.",
    evidence: "Business process maps, criticality matrix, BIA, owner interviews, RTO/RPO or downtime requirements.",
    followUps: ["What business process stops if this service is unavailable?", "Which downstream teams may not realize they depend on it?"],
    talkingPoints: ["Technical dependency maps do not capture every business dependency.", "Sequence migrations around business impact, not just infrastructure convenience."],
  },
  vm13: {
    suggestedAnswer: "Yes. Data is classified by migrate, retain, archive, delete, legal hold, residency, retention period, owner, and validation requirement.",
    evidence: "Data inventory, retention schedule, legal/compliance requirements, migration mapping, archive plan.",
    followUps: ["What data must move versus remain available only for retention or audit?", "How will you prove migrated data is complete and accurate?"],
    talkingPoints: ["Moving everything is not the same as migrating correctly.", "Data decisions should be made before transfer, not during the cutover window."],
  },
  vm14: {
    suggestedAnswer: "Yes. External and shared dependencies such as APIs, SSO, DNS, certificates, firewall rules, service accounts, webhooks, allowlists, integrations, and monitoring are cataloged with owners and change steps.",
    evidence: "Integration register, firewall matrix, DNS/certificate inventory, IAM/service-account list, API documentation.",
    followUps: ["Which shared services must change at cutover time?", "Which integrations are maintained outside the migration team?"],
    talkingPoints: ["Small external dependencies can cause large production failures.", "Treat identity, DNS, firewall, certificates, and service accounts as first-class migration workstreams."],
  },
  vm15: {
    suggestedAnswer: "Yes. The organization has deliberately identified assets, data, applications, configurations, and licenses that should be retired, consolidated, archived, or redesigned rather than migrated.",
    evidence: "Disposition matrix, rationalization decisions, retirement approvals, archive plan, duplicate/obsolete inventory.",
    followUps: ["What are we intentionally leaving behind?", "What criteria determine whether something is migrated, modernized, archived, or retired?"],
    talkingPoints: ["A migration is an opportunity to reduce complexity, not preserve it forever.", "Every unnecessary item moved adds cost, testing, and future support burden."],
  },
  vm16: {
    suggestedAnswer: "Yes. The cutover plan includes prerequisites, sequence, owners, dates, dependencies, communications, checkpoints, go/no-go authority, validation, rollback, and closure steps.",
    evidence: "Cutover runbook, integrated project plan, command-center plan, decision checkpoints, owner assignments.",
    followUps: ["Could the team execute the cutover from the runbook without inventing steps in real time?", "Where are the explicit go/no-go checkpoints and decision owners?"],
    talkingPoints: ["A project schedule is not the same thing as a cutover runbook.", "Cutover documentation should be executable under pressure."],
  },
  vm17: {
    suggestedAnswer: "Yes. Success criteria are measurable, approved in advance, cover technical and business outcomes, and specify who accepts each result.",
    evidence: "Acceptance matrix, performance baselines, UAT criteria, service health checks, sign-off requirements.",
    followUps: ["What exact evidence proves the migration succeeded?", "Who has authority to accept degraded performance, missing functionality, or open defects?"],
    talkingPoints: ["If 'done' is subjective, the project can declare victory while users are still broken.", "Define success before cutover so acceptance is evidence-based."],
  },
  vm18: {
    suggestedAnswer: "Yes. Functional, integration, data, security, performance, monitoring, backup/recovery, and business workflow testing is planned with owners and expected results.",
    evidence: "Test plan, UAT scripts, test cases, defect log, sign-offs, nonproduction migration results.",
    followUps: ["Which business workflows will users validate after migration?", "What testing is happening in nonproduction before production cutover?"],
    talkingPoints: ["A system can be technically online and still fail the business process.", "Test the workflow from the user's perspective, not only infrastructure health."],
  },
  vm19: {
    suggestedAnswer: "Yes. Rollback criteria, decision authority, trigger times, steps, data implications, communications, and expected recovery duration are documented and tested where practical.",
    evidence: "Rollback runbook, decision matrix, reverse-migration test, recovery timing, communications plan.",
    followUps: ["What specific condition causes the team to stop troubleshooting and roll back?", "Who can make that decision and how long does rollback actually take?"],
    talkingPoints: ["A rollback plan that starts with 'if needed' is not a rollback plan.", "Pre-agree the trigger and authority so the team does not debate while the outage clock is running."],
  },
  vm20: {
    suggestedAnswer: "Yes. Backups and recovery mechanisms are current, monitored, restorable, tested, and aligned to the migration's recovery objectives before irreversible change.",
    evidence: "Backup status, restore-test evidence, RPO/RTO, recovery runbook, snapshot/replication validation.",
    followUps: ["When was the last successful restore test for this workload?", "What is the maximum acceptable data loss and recovery time during cutover?"],
    talkingPoints: ["A successful backup job does not prove recoverability.", "Test restore paths before the migration depends on them."],
  },
  vm21: {
    suggestedAnswer: "Yes. Knowledge-transfer sessions, artifacts, owners, dates, recordings, validation, and acceptance criteria are defined for incumbent, internal teams, and incoming vendor.",
    evidence: "KT plan, attendance, recordings, runbooks, acceptance checklist, open knowledge gaps.",
    followUps: ["What knowledge currently exists only with the incumbent vendor?", "How will the receiving team prove it can operate the environment without them?"],
    talkingPoints: ["Knowledge transfer should be verified, not assumed because meetings happened.", "The receiving team must demonstrate operational capability before exit."],
  },
  vm22: {
    suggestedAnswer: "Yes. Current diagrams, runbooks, SOPs, support contacts, escalation paths, configurations, inventories, and known issues are transferred, reviewed, and owned.",
    evidence: "Documentation inventory, handoff checklist, repository ownership, version dates, acceptance sign-off.",
    followUps: ["Which documents are still missing, stale, or vendor-owned?", "Where will the authoritative documentation live after transition?"],
    talkingPoints: ["Documentation must have an owner and a home after the migration.", "Handoff is incomplete if the new team inherits stale files and tribal knowledge."],
  },
  vm23: {
    suggestedAnswer: "Yes. Support, operations, service desk, and business-facing teams are trained on new tools, procedures, routing, escalation, and common failure scenarios before go-live.",
    evidence: "Training plan, attendance, job aids, knowledge articles, support scripts, readiness sign-off.",
    followUps: ["What will the service desk do differently on day one?", "How are after-hours teams and regional support staff being prepared?"],
    talkingPoints: ["Users experience the migration through support as much as through technology.", "Train the people who will receive the first calls when something breaks."],
  },
  vm24: {
    suggestedAnswer: "Yes. Hypercare has defined duration, staffing, command structure, enhanced monitoring, incident thresholds, vendor participation, reporting, and exit criteria.",
    evidence: "Hypercare plan, staffing schedule, monitoring dashboard, escalation tree, exit criteria.",
    followUps: ["Who is staffed for the first hours and days after cutover?", "What metrics determine when hypercare can end?"],
    talkingPoints: ["Go-live is the start of stabilization, not the end of the migration.", "Do not release the migration team before operational stability is demonstrated."],
  },
  vm25: {
    suggestedAnswer: "Yes. Steady-state ownership, support tiers, KPIs, SLAs, documentation, governance cadence, backlog ownership, and vendor management are defined before project closure.",
    evidence: "Operating model, support matrix, SLA/KPI dashboard, governance calendar, backlog/ownership transfer.",
    followUps: ["Who owns the environment 30 days after the project team leaves?", "Which metrics and governance meetings continue after hypercare?"],
    talkingPoints: ["A migration is not complete until the target environment can be operated without the migration team.", "Project closure should require operational ownership and measurable stability."],
  },

  it01: {
    suggestedAnswer: "Managed, measured & documented. ITAM is a defined organizational capability with approved scope, objectives, accountable leadership, resources, and repeatable processes.",
    evidence: "ITAM charter, operating model, program scope, leadership ownership, roadmap, documented processes.",
    followUps: ["Who owns ITAM as a business capability today?", "What is formally in scope: hardware, software, SaaS, cloud, mobile, network, data center, other assets?"],
    talkingPoints: ["A tool or inventory repository is not the same thing as an ITAM program.", "Define the capability, ownership, scope, and outcomes before optimizing tooling."],
  },
  it02: {
    suggestedAnswer: "Managed, measured & documented. Roles, decision rights, data ownership, process ownership, exceptions, escalation, and cross-functional responsibilities are explicit.",
    evidence: "RACI/RASCI, role descriptions, governance charter, data-owner matrix, escalation paths.",
    followUps: ["Who can correct bad asset data and who is accountable when it remains wrong?", "Where do Procurement, Finance, Security, HR, Service Management, and ITAM responsibilities overlap?"],
    talkingPoints: ["ITAM is cross-functional by nature; unclear ownership creates permanent data and process gaps.", "Make decision authority as explicit as task responsibility."],
  },
  it03: {
    suggestedAnswer: "Managed, measured & documented. Lifecycle policies cover request, approval, procurement, receipt, deployment, use, move/change, return, repair, loss, retirement, sanitization, and disposal with controlled exceptions.",
    evidence: "ITAM policy, lifecycle SOPs, exception process, disposal policy, procurement standards.",
    followUps: ["Which lifecycle stages are governed by policy versus informal practice?", "How are exceptions approved and recorded?"],
    talkingPoints: ["Lifecycle consistency is what turns inventory into asset management.", "Policies should define required controls without making routine work impossible."],
  },
  it04: {
    suggestedAnswer: "Managed, measured & documented. ITAM goals directly support cost, security, compliance, employee experience, procurement, audit, service management, and technology strategy.",
    evidence: "Objectives/KPIs, strategy alignment, executive reporting, risk register, savings/avoidance targets.",
    followUps: ["Which business decisions currently depend on ITAM data?", "What does leadership expect ITAM to improve this year?"],
    talkingPoints: ["ITAM becomes strategic when its data changes business decisions.", "Tie the program to measurable outcomes beyond inventory completeness."],
  },
  it05: {
    suggestedAnswer: "Managed, measured & documented. Management reviews ITAM KPIs, risks, exceptions, compliance, financial opportunities, and improvement actions on a defined cadence.",
    evidence: "Governance meeting minutes, KPI dashboard, risk/exception register, improvement backlog, leadership reports.",
    followUps: ["What does management review about ITAM today and how often?", "Which recurring issues remain open because nobody owns remediation?"],
    talkingPoints: ["Without management review, ITAM problems become background noise.", "A regular decision cadence converts metrics into corrective action."],
  },
  it06: {
    suggestedAnswer: "Managed, measured & documented. The organization can identify its owned, leased, subscribed, cloud, virtual, and otherwise controlled IT assets with defined coverage and known exceptions.",
    evidence: "Asset repository, discovery coverage, procurement records, lease/subscription data, exception/unknown inventory.",
    followUps: ["What asset classes are not reliably visible today?", "How do you quantify unknown or unmanaged technology?"],
    talkingPoints: ["You cannot secure, optimize, budget, or retire assets you cannot see.", "Coverage should be measured by asset class, not assumed globally."],
  },
  it07: {
    suggestedAnswer: "Managed, measured & documented. Each relevant asset has reliable location, custodian/owner, assignment, organizational context, and status appropriate to its asset class.",
    evidence: "Assignment records, location data, custody chain, HR/user reconciliation, site inventory, exception reports.",
    followUps: ["How often do you find assets with no reliable owner or location?", "Which event causes ownership/location data to be updated?"],
    talkingPoints: ["An asset record without accountable ownership is only partially useful.", "Custody and location should change as part of the workflow, not through annual cleanup."],
  },
  it08: {
    suggestedAnswer: "Managed, measured & documented. Discovery and authoritative sources are reconciled on a defined cadence, discrepancies are measured, and corrections have owners and SLAs.",
    evidence: "Reconciliation jobs, exception queues, data-quality reports, source precedence rules, correction SLAs.",
    followUps: ["Which source wins when procurement, discovery, endpoint management, and CMDB disagree?", "What is the current discrepancy rate and who works the exceptions?"],
    talkingPoints: ["Multiple tools are normal; unreconciled tools are the problem.", "Trustworthy data requires source rules and an exception-management process."],
  },
  it09: {
    suggestedAnswer: "Managed, measured & documented. Required fields, identifiers, naming, statuses, relationships, source ownership, validation rules, and data definitions are standardized by asset class.",
    evidence: "Data dictionary, required-field matrix, naming standards, state model, validation rules, ownership matrix.",
    followUps: ["Which fields are truly required to make business decisions?", "Do teams use the same definitions for deployed, stock, retired, lost, and disposed?"],
    talkingPoints: ["Bad definitions create bad metrics even when every field is populated.", "Standardize meanings before chasing completeness percentages."],
  },
  it10: {
    suggestedAnswer: "Managed, measured & documented. ITAM is integrated or systematically reconciled with procurement, HR, CMDB/discovery, endpoint tools, finance, service management, security, and other authoritative sources.",
    evidence: "Integration map, API/jobs, reconciliation logic, source-of-truth matrix, failure monitoring.",
    followUps: ["Which handoffs still depend on spreadsheets or manual rekeying?", "What happens when HR terminates a user or Procurement receives a new asset?"],
    talkingPoints: ["The strongest ITAM programs sit between systems rather than trying to replace all of them.", "Automate the lifecycle events that create the most data drift."],
  },
  it11: {
    suggestedAnswer: "Managed, measured & documented. Technology purchases follow approved catalogs, budget/need review, security/architecture controls, entitlement checks, and purchase-to-asset traceability.",
    evidence: "Procurement workflow, approved catalog, PO controls, request/approval records, exception purchases.",
    followUps: ["How often does technology enter the environment outside the approved buying process?", "Can every major purchase be traced to a request, owner, cost center, and resulting asset/entitlement?"],
    talkingPoints: ["ITAM control starts before the asset arrives.", "Unauthorized buying creates duplicate spend, support gaps, and incomplete inventory."],
  },
  it12: {
    suggestedAnswer: "Managed, measured & documented. Assets are recorded with required identifiers and assignment data at receipt/staging or before deployment, with controls preventing unmanaged deployment.",
    evidence: "Receiving process, barcode/tagging records, staging workflow, deployment checklist, assignment evidence.",
    followUps: ["At what exact point does an asset become an authoritative ITAM record?", "Can equipment leave staging before it is recorded and assigned?"],
    talkingPoints: ["If registration happens after deployment, inventory debt begins on day one.", "Capture the asset while you physically control it."],
  },
  it13: {
    suggestedAnswer: "Managed, measured & documented. Moves, changes, transfers, repairs, losses, swaps, and ownership changes are driven by service workflows or integrations that update the asset record and preserve history.",
    evidence: "Move/add/change workflows, service tickets, audit history, repair/RMA process, custody transfers.",
    followUps: ["Which common asset events fail to update the repository automatically?", "Can you reconstruct an asset's custody and status history?"],
    talkingPoints: ["Most data decay happens after deployment.", "Design lifecycle updates into the operational workflows people already use."],
  },
  it14: {
    suggestedAnswer: "Managed, measured & documented. HR events trigger timely asset-return workflows with ownership, reminders, escalation, remote-worker logistics, reconciliation, and exceptions.",
    evidence: "Offboarding workflow, HR integration, return kit process, aging report, payroll/legal escalation where appropriate.",
    followUps: ["What percentage of terminated users still have assigned assets after their final day?", "How are remote workers, leaves, contractors, and role transfers handled?"],
    talkingPoints: ["Offboarding is one of the clearest tests of whether ITAM is integrated with the business.", "Make asset recovery a triggered workflow, not an email somebody remembers to send."],
  },
  it15: {
    suggestedAnswer: "Managed, measured & documented. Retirement includes authorization, data sanitization, chain of custody, environmental/compliance handling, lease/return requirements, disposal evidence, financial closure, and record status updates.",
    evidence: "Disposition certificates, wipe logs, chain-of-custody records, vendor reports, lease returns, retirement workflow.",
    followUps: ["Can you prove how a retired device was sanitized and disposed of?", "Who reconciles disposal evidence back to the asset repository and financial records?"],
    talkingPoints: ["Retirement is both a security control and a financial closeout process.", "A device is not retired because it left the building; the evidence must close the lifecycle."],
  },
  it16: {
    suggestedAnswer: "Managed, measured & documented. Software, SaaS, and cloud entitlements are inventoried with publisher/product normalization, contract rights, quantities/metrics, terms, owners, and renewal dates.",
    evidence: "Entitlement repository, contracts/order records, license terms, SaaS inventory, publisher/product normalization.",
    followUps: ["Which major publishers or SaaS services have incomplete entitlement records?", "Can you explain what the organization is legally entitled to use without rebuilding the answer from invoices?"],
    talkingPoints: ["Install data alone cannot establish software compliance.", "Entitlement evidence is the ownership side of the software position."],
  },
  it17: {
    suggestedAnswer: "Managed, measured & documented. Entitlements are regularly reconciled to deployment/consumption using publisher-specific metrics, with exceptions, optimization opportunities, and audit-ready evidence.",
    evidence: "Effective license position, reconciliation reports, SaaS usage, publisher metric logic, remediation backlog.",
    followUps: ["For which publishers can you produce an effective license position today?", "How are complex metrics, virtualization, cloud use, and indirect access handled?"],
    talkingPoints: ["License compliance is a calculation, not a software count.", "Prioritize publishers by audit exposure, spend, and contractual complexity."],
  },
  it18: {
    suggestedAnswer: "Managed, measured & documented. Contracts, renewals, warranties, maintenance, support, lease terms, notice periods, and expiration dates are centralized with owners, alerts, and review lead times.",
    evidence: "Contract register, renewal calendar, warranty/lease data, notice-period tracking, owner assignments.",
    followUps: ["How much notice do you get before major renewals or termination deadlines?", "Which agreements still live primarily in individual inboxes or shared drives?"],
    talkingPoints: ["Renewal visibility creates negotiating leverage.", "If the organization discovers a renewal when the invoice arrives, the decision window is already gone."],
  },
  it19: {
    suggestedAnswer: "Managed, measured & documented. ITAM routinely identifies reclamation, shelfware, duplicate services, inactive SaaS accounts, oversized subscriptions, dormant hardware, and other avoidable spend and tracks realized savings.",
    evidence: "Reclamation reports, SaaS usage analytics, savings register, duplicate-product analysis, recovery workflows.",
    followUps: ["How much spend has ITAM actually avoided or reclaimed in the last year?", "What happens operationally after an unused license or asset is identified?"],
    talkingPoints: ["Optimization requires a closed loop from insight to reclamation to measured savings.", "Track realized value, not just theoretical opportunity."],
  },
  it20: {
    suggestedAnswer: "Managed, measured & documented. Asset and entitlement records reconcile to PO, invoice, GL/cost center, lease, capitalization, depreciation, chargeback/showback, and budgeting data at an appropriate level.",
    evidence: "Finance reconciliation, PO/invoice linkage, cost center data, fixed-asset mapping, forecast/budget reports.",
    followUps: ["Where do Finance and ITAM disagree about the technology estate today?", "Can lifecycle and contract data support next-year budgeting and current-year forecasting?"],
    talkingPoints: ["Financial integration turns ITAM into a planning function, not just an operational database.", "Reconcile at the level needed for decisions; perfection everywhere is not required before value appears."],
  },
  it21: {
    suggestedAnswer: "Managed, measured & documented. ITAM can identify EOL/EOS, unauthorized, missing, vulnerable, unmanaged, unencrypted, unpatched, or otherwise risky assets and route them to owners for action.",
    evidence: "EOL/EOS reports, security integration, unauthorized asset report, risk dashboards, remediation ownership.",
    followUps: ["Which high-risk asset conditions can ITAM identify without a manual project?", "How are risk findings assigned and closed?"],
    talkingPoints: ["Security cannot protect assets it does not know exist or understand.", "ITAM provides context—ownership, lifecycle, location, support status—that technical security tools often lack."],
  },
  it22: {
    suggestedAnswer: "Managed, measured & documented. Missing/lost/stolen assets follow a defined investigation, escalation, security/privacy review, financial treatment, recovery, and record-closure process.",
    evidence: "Lost/stolen procedure, incident records, police/security reports where applicable, write-off approvals, reconciliation logs.",
    followUps: ["What happens when an asset has not checked in or cannot be located?", "When does a missing asset become a security incident, financial write-off, or management escalation?"],
    talkingPoints: ["Unaccounted-for assets are not just inventory exceptions; they may be security and financial risks.", "Define time-based escalation and closure criteria."],
  },
  it23: {
    suggestedAnswer: "Managed, measured & documented. ITAM data is an established input to cybersecurity, audits, compliance, continuity planning, incident response, vulnerability management, and risk decisions.",
    evidence: "Security/audit integrations, control evidence, BCP/DR asset lists, incident workflows, compliance reports.",
    followUps: ["Which security or audit controls rely on ITAM data today?", "Would Security trust the asset repository during an incident?"],
    talkingPoints: ["The value of ITAM increases when other control functions trust and consume the data.", "Use cross-functional demand as a quality test for the repository."],
  },
  it24: {
    suggestedAnswer: "Managed, measured & documented. KPIs measure coverage, completeness, accuracy, timeliness, process performance, exceptions, lifecycle compliance, cost outcomes, and risk—not just total asset counts.",
    evidence: "KPI definitions, dashboards, trends, SLA/OLA metrics, data-quality scorecards, management reporting.",
    followUps: ["Which metrics tell you whether the ITAM program is healthy rather than merely busy?", "Do KPIs have targets, owners, trends, and corrective actions?"],
    talkingPoints: ["Counting records is not the same as measuring control.", "Use a small set of actionable KPIs tied to business outcomes and data quality."],
  },
  it25: {
    suggestedAnswer: "Managed, measured & documented. Audit findings, metrics, incidents, cost opportunities, technology changes, and stakeholder feedback feed a prioritized improvement backlog with owners, benefits, and review cadence.",
    evidence: "Improvement register, roadmap, audit remediation, retrospectives, value tracking, governance decisions.",
    followUps: ["How does the ITAM program decide what to improve next?", "Can you point to changes made because the data or metrics showed a recurring problem?"],
    talkingPoints: ["Mature ITAM is a management system that continually improves, not a one-time cleanup project.", "Use recurring exceptions and business demand to prioritize the roadmap."],
  },
};

function answerPriority(type: AssessmentType, answer: string, critical: boolean | undefined) {
  if (type === "vendor-migration") {
    if (critical && (answer === "no" || answer === "unknown")) return "critical" as const;
    if (answer === "no" || answer === "unknown") return "high" as const;
    if (answer === "partially" || answer === "mostly") return "medium" as const;
    return "validation" as const;
  }

  if (answer === "not_in_place" || answer === "ad_hoc") return "high" as const;
  if (answer === "partial") return "medium" as const;
  return "validation" as const;
}

function consultantPrompt(type: AssessmentType, answer: string, item: GuideContent) {
  const weak = type === "vendor-migration"
    ? ["no", "unknown", "partially"].includes(answer)
    : ["not_in_place", "ad_hoc", "partial"].includes(answer);

  if (answer === "na") {
    return `They marked this not applicable. Confirm the rationale and document why the control truly does not apply to this migration.`;
  }

  if (weak) {
    return `Their assessment indicates a gap here. Start with: “${item.followUps[0]}” Then establish what exists today, what is missing, who owns the gap, and whether it must be resolved before the next project milestone.`;
  }

  return `They reported a relatively strong control. Validate it rather than assuming it is mature. Ask: “${item.followUps[0]}” Request evidence and look for consistency, ownership, and exceptions.`;
}

export function generateConsultationGuide(
  type: AssessmentType,
  answers: Array<{ id: string; answer: string; answerLabel: string }> | Record<string, string>,
): ConsultationGuideItem[] {
  const definition = assessments[type];
  const answerMap = Array.isArray(answers)
    ? Object.fromEntries(answers.map((answer) => [answer.id, { value: answer.answer, label: answer.answerLabel }]))
    : Object.fromEntries(Object.entries(answers).map(([id, value]) => [id, {
        value,
        label: definition.options.find((option) => option.value === value)?.label || value,
      }]));

  const priorityRank = { critical: 0, high: 1, medium: 2, validation: 3 } as const;

  return definition.questions
    .map((question) => {
      const content = guide[question.id];
      if (!content) throw new Error(`Missing consultation guide content for ${question.id}`);
      const response = answerMap[question.id] || { value: "unknown", label: "Unknown" };
      const priority = answerPriority(type, response.value, question.critical);
      return {
        questionId: question.id,
        category: question.category,
        assessmentQuestion: question.text,
        assessmentAnswer: response.value,
        assessmentAnswerLabel: response.label,
        priority,
        consultantPrompt: consultantPrompt(type, response.value, content),
        ...content,
      };
    })
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}

export function getGuideCoverage() {
  return Object.values(assessments).flatMap((definition) => definition.questions.map((question) => ({
    id: question.id,
    covered: Boolean(guide[question.id]),
  })));
}
