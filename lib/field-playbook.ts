export type FieldQuestion = {id:string;label:string;hint?:string};
export type FieldSection = {id:string;title:string;description:string;questions:FieldQuestion[]};
export const fieldSections:FieldSection[]=[
 {id:"scope",title:"01 · Arrival & scope",description:"Confirm why you are there, who authorizes access, and which spaces are in scope.",questions:[
 {id:"business_objective",label:"What are the business objectives, pain points, and expected outcomes?"},
 {id:"site_contact",label:"Who is the on-site point of contact and escalation owner?"},
 {id:"locations_scope",label:"Which buildings, floors, rooms, and remote offices are in scope?"},
 {id:"out_of_scope",label:"Which areas, people, or devices must not be accessed?"},
 {id:"access_approval",label:"Who approved the walkthrough, photographs, and device discovery?"},
 {id:"site_constraints",label:"What are the operating hours, safety rules, and restricted zones?"}]},
 {id:"people",title:"02 · Users & ownership",description:"Build a map of the people supporting and using the environment.",questions:[
 {id:"headcount",label:"Total staff, contractors, and remote users?"},
 {id:"it_contacts",label:"Who provides IT support, and how are tickets escalated?"},
 {id:"onboarding",label:"How are devices assigned during onboarding, moves, and offboarding?"},
 {id:"shared_assets",label:"Which devices are shared or lack a named owner?"},
 {id:"vendors",label:"Which MSPs, hardware vendors, and service contracts are involved?"}]},
 {id:"network",title:"03 · Connectivity & infrastructure",description:"Document the topology at a high level without gathering secrets.",questions:[
 {id:"isp",label:"Internet providers, circuits, backup links, and service issues?"},
 {id:"lan",label:"Network switches, routers, firewalls, access points, and locations?"},
 {id:"wifi",label:"Employee/guest Wi-Fi segmentation and coverage issues?"},
 {id:"racks",label:"Where are MDF/IDF rooms, racks, UPS units, and network closets?"},
 {id:"remote_access",label:"What remote access or VPN solutions are used?"},
 {id:"network_diagram",label:"Is a current network diagram available? Who owns it?"},
 {id:"network_risks",label:"Known outages, legacy equipment, and support gaps?"}]},
 {id:"devices",title:"04 · Endpoint & device inventory",description:"Inventory physical equipment, capture serials, tags and locations in the Assets tab.",questions:[
 {id:"device_classes",label:"What device categories exist: desktop, laptop, thin client, tablet, phone, printer, MFP, scanner, POS, kiosk, server, network, AV, IoT?"},
 {id:"device_counts",label:"Approximate device counts by category versus actual observed counts?"},
 {id:"device_sources",label:"Where are device inventories stored (ServiceNow, Intune, Jamf, spreadsheets, etc.)?"},
 {id:"asset_identifiers",label:"Are serial numbers, asset tags, hostnames, and assigned users consistently captured?"},
 {id:"unsupported_devices",label:"Which systems are unsupported, unmanaged, missing, or past lifecycle?"},
 {id:"loaners_spares",label:"Where are loaners, spare equipment, and storage stock kept?"},
 {id:"device_security",label:"How are devices encrypted, patched, locked and remotely managed?"},
 {id:"disposal",label:"What is the process for retired assets, data erasure and disposal evidence?"}]},
 {id:"apps",title:"05 · Software & licensing",description:"Understand the application estate and ownership of subscriptions.",questions:[
 {id:"critical_apps",label:"What are the business-critical applications and their owners?"},
 {id:"software_sources",label:"Where are software installations and licenses tracked?"},
 {id:"subscriptions",label:"What SaaS subscriptions and renewals need review?"},
 {id:"license_positions",label:"Which licenses are over-deployed, unused, or unassigned?"},
 {id:"shadow_it",label:"Are there unapproved tools or unmanaged cloud accounts?"},
 {id:"backup_apps",label:"How are application configuration and data backed up?"}]},
 {id:"controls",title:"06 · Security & continuity",description:"Record controls and gaps; never collect passwords or secret keys in the logbook.",questions:[
 {id:"mfa",label:"Where is MFA enforced, and where is it missing?"},
 {id:"identity",label:"Which identity systems are used (AD, Entra ID, Google Workspace, etc.)?"},
 {id:"admin_accounts",label:"How are privileged accounts granted, reviewed and revoked?"},
 {id:"endpoint_protection",label:"Endpoint security, EDR, patching and monitoring coverage?"},
 {id:"backups",label:"Backup systems, retention, off-site copies, and restore test evidence?"},
 {id:"incident",label:"Incident response owner and last documented recovery exercise?"},
 {id:"physical",label:"Physical access, equipment storage, and visitor controls?"},
 {id:"compliance",label:"Any contractual, insurance, privacy, or regulatory obligations?"}]},
 {id:"operations",title:"07 · Process & documentation",description:"Identify who owns the operating model and its quality.",questions:[
 {id:"documentation",label:"What diagrams, SOPs, purchase records and vendor contracts exist?"},
 {id:"procurement",label:"How are assets purchased, received, approved and tagged?"},
 {id:"inventory_accuracy",label:"How are assets reconciled and how often are physical audits done?"},
 {id:"helpdesk",label:"How are requests, incidents and change approvals tracked?"},
 {id:"refresh",label:"What replacement/refresh standards and budgets exist?"},
 {id:"quick_wins",label:"What low-effort improvements can be completed immediately?"}]},
 {id:"documents",title:"08 · Evidence & deliverables",description:"Register which documents exist, what must be created, and who owns the missing evidence. Do not paste credentials or private keys.",questions:[
 {id:"doc_asset_register",label:"Asset register: source, coverage, owner, last reconciliation, and export location?"},
 {id:"doc_network_map",label:"Network topology and annotated floor plan: available or needs creating?"},
 {id:"doc_vendor_register",label:"Vendor, contract, warranty, licensing, and renewal register: who owns it?"},
 {id:"doc_identity_access",label:"Account and privileged-access process: documentation and gaps?"},
 {id:"doc_recovery",label:"Backup and disaster recovery runbook: current version, owner, and last test?"},
 {id:"doc_lifecycle",label:"Asset procurement, tagging, assignment, movement, and disposal procedures?"},
 {id:"doc_risks",label:"Risk register: issue, severity, evidence reference, action owner, target date?"},
 {id:"doc_photo_log",label:"Photo/evidence log: file reference, location, date, and approval to capture?"},
 {id:"doc_support",label:"Service desk contacts, vendor escalation matrix, and site support instructions?"},
 {id:"doc_handoff",label:"Deliverable handoff checklist, recipient, and required approval/sign-off?"}]},
 {id:"closeout",title:"09 · Findings & closeout",description:"Turn observations into a usable assessment deliverable.",questions:[
 {id:"high_risk",label:"Critical issues, severity, affected systems and business impact?"},
 {id:"gaps",label:"Missing evidence, access limitations and follow-up questions?"},
 {id:"recommendations",label:"Prioritized recommendations: immediate, 30-day, 90-day?"},
 {id:"executive_summary",label:"Public-facing summary of the site and main findings?"},
 {id:"next_steps",label:"Owners, next meeting, deliverables and due dates?"},
 {id:"signoff",label:"Who reviewed the findings on site, and when?"}]},
];
export const fieldQuestionCount=fieldSections.reduce((n,s)=>n+s.questions.length,0);
export const assetCategories=["Laptop","Desktop","Thin client","Tablet","Mobile phone","Printer","Multifunction printer","Scanner","POS","Kiosk","Server","Storage","Switch","Router","Firewall","Wireless AP","UPS","AV / conference","IoT / smart device","Peripheral","Other"];
export function completion(answers:Record<string,string>,assets:unknown[]):number{
 const filled=fieldSections.flatMap(s=>s.questions).filter(q=>(answers[q.id]||"").trim().length>0).length;
 // Completion measures documented questions; device inventory is reported separately.
 void assets;
 return Math.round(filled/fieldQuestionCount*100);
}
