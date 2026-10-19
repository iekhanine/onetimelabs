export type Task = {id:string;phase:number;category:string;title:string;detail:string;deliverable:string;questions:string[]};
export const phases=[
{label:'Days 1–5',name:'Discover & establish baseline',goal:'Identify stakeholders, systems, asset populations, ownership, and current-state controls.',output:'Baseline inventory and source-of-truth matrix.'},
{label:'Days 6–10',name:'Validate & reconcile',goal:'Sample physical assets, test data accuracy, resolve mismatches, and quantify exceptions.',output:'Field-validation results and discrepancy register.'},
{label:'Days 11–15',name:'Lifecycle & governance',goal:'Map custody, procurement, refresh, disposal, and CMDB change controls.',output:'Documented lifecycle workflows and RACI.'},
{label:'Days 16–20',name:'Automation & risk reduction',goal:'Evaluate discovery integrations, security coverage, and systemic sources of drift.',output:'Remediation backlog and automation opportunities.'},
{label:'Days 21–30',name:'Operationalize & report',goal:'Turn findings into repeatable controls, reporting, ownership, and a 60/90-day roadmap.',output:'Executive readout, operational SOPs, KPI baseline, and roadmap.'}
];
const make=(phase:number,category:string,items:[string,string,string,string[]][]):Task[]=>items.map(([title,detail,deliverable,questions],i)=>({id:`p${phase}-${category.toLowerCase().replace(/[^a-z]+/g,'-')}-${i+1}`,phase,category,title,detail,deliverable,questions}));
export const tasks:Task[]=[
...make(0,'Engagement & access',[
['Confirm mandate, scope and success criteria','Clarify locations, in-scope asset classes, required accuracy, exclusions, dependencies, timelines, and escalation rights.','Signed scope and outcome statement',['What is in scope?','What does “accurate” mean to this organization?']],
['Build stakeholder and RACI map','Identify service operations, endpoint, networking, procurement, finance, facilities, security, HR, and disposal owners.','Contact map and working RACI',['Who can authorize record changes?','Who resolves missing ownership?']],
['Request read-only system and reporting access','Obtain least-privilege access to ITAM, CMDB, endpoint, discovery, ticketing, procurement, and reporting tools.','Access register',['Which systems are authoritative?','What data must not be exported?']],
['Identify sites and field constraints','List facilities, remote areas, access permissions, escorts, maintenance windows, safety procedures, and travel logistics.','Site coverage and fieldwork plan',['Which locations hold specialized equipment?']],
['Review existing policies and audit findings','Collect hardware standards, inventory policy, recent audit reports, asset tagging rules, refresh standards, and security requirements.','Policy and audit gap inventory',['When was the last independent inventory check?']]
]),
...make(0,'Data baseline',[
['Export baseline asset population','Record counts by type, location, lifecycle state, owner, age, and cost center using approved data handling.','Dated baseline snapshot',['Are inactive and ghost records included?']],
['Define asset identification standards','Review serial, tag, hostname, manufacturer, model, procurement IDs, and unique external identifiers.','Field-level identification map',['How are duplicates detected?']],
['Map discovery and system integrations','Document scheduled syncs, APIs, MDM, EDR, network scans, cloud discovery, imports, and manual updates.','Data-flow diagram and integration register',['What is the sync frequency?','Which source wins conflicts?']],
['Document existing KPIs and exception queues','Determine current coverage, completeness, freshness, duplication, orphan rates, and aging exceptions.','Initial KPI definitions',['How are metrics calculated?']]
]),
...make(1,'Field verification',[
['Design risk-based sample and validation protocol','Sample representative asset types, locations, ownership groups, and high-risk environments; preserve sampling method.','Field audit plan',['Are sites sampled proportionally or by risk?']],
['Verify devices and placement','Compare tag, serial, model, condition, assigned user, building/room, cost center, and custody to records.','Signed verification log',['Where is the asset physically?','Does the owner agree?']],
['Inventory unmanaged and nonstandard hardware','Locate POS, printers, kiosks, networking, IoT, peripherals, and devices not enrolled in endpoint tools.','Unmanaged asset register',['Which hardware is invisible to discovery?']],
['Reconcile discovery versus ITAM/CMDB','Match deterministic identifiers; review missing, duplicate, stale, unassigned, and retired-but-active records.','Exception reconciliation workbook',['Which discrepancies repeat?']],
['Trace lifecycle exceptions to source','Investigate record creation, transfer, offboarding, imaging, disposal, integration, and manual entry failures.','Root-cause classification',['Is this a data issue or a broken process?']],
['Establish evidence standards','Define authorized photo/evidence handling, timestamps, verifier, source system, and audit traceability.','Evidence collection SOP',['Can another analyst reproduce a finding?']]
]),
...make(2,'Hardware lifecycle',[
['Map procure-to-receive controls','Review purchase request approval, PO matching, receiving, serial capture, warranty data, cost assignment, and tagging.','Procurement-to-receipt swimlane',['Do all assets enter inventory before deployment?']],
['Map build-to-deploy controls','Define staging, imaging, naming, encryption, endpoint enrollment, user acceptance, and handoff checkpoints.','Deployment SOP',['When does ownership change?']],
['Map move/add/change flows','Review reassignment, location transfers, department moves, device swaps, and CMDB linkage to tickets and changes.','MACD control checklist',['Which events automatically update the asset?']],
['Map service, repair and loaner processes','Track spare pools, replacements, RMAs, warranty claims, return-to-stock, and temporary custody.','Repair and loaner process',['Can one device have two owners?']],
['Map retirement and chain of custody','Verify decommission, data sanitization evidence, approved vendors, recycling, resale, and financial reconciliation.','Retirement and disposition SOP',['Can disposal be proven for every serial?']],
['Assess refresh eligibility and funding','Combine age, security support, performance, warranty, repair economics, business criticality, and budget codes.','Prioritized refresh criteria',['Are replacement decisions evidence-based?']]
]),
...make(2,'CMDB relationships',[
['Document asset-to-CI relationship rules','Define when an asset is also a configuration item and how user, service, device, incident, change, and network relationships are maintained.','Relationship standard',['Do ITAM and CMDB represent different purposes?']],
['Specify field ownership and lifecycle states','Assign accountable owners for each critical field; standardize status transitions and allowed values.','Data dictionary and ownership matrix',['Who wins a conflict between systems?']],
['Evaluate financial attribution','Validate asset cost center, department, lease, project code, useful life, and capitalization requirements with finance.','Financial data quality findings',['What supports chargeback and refresh planning?']]
]),
...make(3,'Discovery & controls',[
['Check discovery coverage and blind spots','Compare procurement, physical findings, endpoint tools, network scan data, EDR and CMDB populations.','Coverage and blind spot report',['What devices never check in?']],
['Test reconciliation jobs and matching rules','Review job logs, schedules, API failures, normalization, dedupe, merge logic, and human exception handling.','Integration control tests',['Which errors are silently ignored?']],
['Assess stale, unsupported and missing devices','Flag devices with outdated heartbeat, unsupported OS/firmware, unknown user, insecure configuration, or missing controls.','Risk-ranked exception list',['Are unmanaged assets escalated to security?']],
['Propose event-driven updates','Identify process triggers from purchasing, MDM enrollment, HR exits, help desk tickets, and disposal certificates.','Automation opportunity register',['Can the asset update itself at the lifecycle event?']],
['Define control cadence and ownership','Establish daily import monitoring, weekly exceptions, monthly reconciliation, quarterly sampling, and audit escalation.','Recurring control calendar',['Who owns unclosed discrepancies?']]
]),
...make(3,'Remediation prioritization',[
['Create triage categories and SLAs','Prioritize missing devices, financial exceptions, unsupported critical assets, orphan records, and unverified disposals.','Severity and escalation matrix',['What must be fixed today versus next quarter?']],
['Run a targeted remediation pilot','Correct one representative location or asset class and measure improvement with approved change tracking.','Pilot results and lessons learned',['Did the fix reduce recurring drift?']],
['Validate audit and privacy safeguards','Review retention, least privilege, data minimization, evidence access, and reporting permissions.','Data handling and audit safeguards',['Do reports expose personal data?']]
]),
...make(4,'Operations & measurement',[
['Publish KPI baseline and scorecard','Track verified coverage, key field completeness, accuracy, duplicates, stale records, discrepancy age, and lifecycle compliance.','KPI scorecard with formulas and caveats',['What are the denominators?']],
['Publish repeatable SOPs and checklists','Standardize field verification, receiving, transfers, reconciliation, retired assets, and exception triage.','Approved SOP package',['Who reviews and updates these SOPs?']],
['Define governance meeting rhythm','Set weekly operational issue review, monthly KPI review, and ownership for critical exceptions.','Governance calendar and agenda',['What decisions happen in each meeting?']],
['Prepare 30-day findings presentation','Summarize discovered inventory, control gaps, risk, quick wins, unresolved issues, and quantified impact without overstating savings.','Executive summary and evidence appendix',['Can every metric be reproduced?']],
['Create 60/90-day roadmap','Sequence ownership, integration fixes, site coverage, automation, documentation, and resourcing requests.','Prioritized backlog with owners/dates',['What needs leadership approval?']],
['Establish handoff and change control','Assign ongoing owners, version documentation, configure review dates, and define work acceptance.','Steady-state operating model',['What prevents drift after handoff?']]
])
];
export const kpis=[['Inventory completeness','Records with required fields ÷ scoped records'],['Verified accuracy','Sampled assets matching required fields ÷ sampled assets'],['Discovery coverage','Discoverable in-scope assets reporting ÷ expected discoverable assets'],['Duplicate rate','Records flagged as duplicates ÷ active records'],['Unassigned asset rate','Active assets without accountable custodian ÷ active assets'],['Stale record rate','Active assets older than freshness threshold ÷ active records'],['Reconciliation closure','Resolved exceptions ÷ opened exceptions per period'],['Disposal evidence coverage','Retired assets with approved disposition proof ÷ retired assets requiring proof']];
export const docTemplates=[['Scope & Success Criteria','Purpose, boundaries, in-scope assets, exclusions, metrics and approvers'],['Source-of-Truth Matrix','System, fields governed, ingestion frequency, data owner and conflict rule'],['Field Verification SOP','Site permissions, sampling, verification steps, evidence and exception handling'],['Exception Register','Asset identifier, defect type, severity, owner, evidence, action, target date and closure'],['Lifecycle SOP','Receive, stage, deploy, transfer, repair, refresh, retire and dispose'],['Data Dictionary & RACI','Critical attribute definitions, owner, validation logic and responsible parties'],['KPI Scorecard','Definitions, denominators, baselines, cadence, caveats and reporting owners'],['30-Day Executive Readout','Findings, verified risk, quick wins, recommendations and 60/90-day roadmap']];
