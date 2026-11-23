import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight, ArrowUpRight, Check, ShieldCheck, Laptop} from "lucide-react";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import s from "../itam/services.module.css";

export const metadata: Metadata = {
  title: "Private Client IT Concierge | Executive & Household Technology",
  description: "Discreet personal IT support for executives, entrepreneurs, and private households. Device management, secure accounts, home offices, and trusted technology coordination.",
};

const services = [
  {number:"01",title:"Personal devices & digital accounts",short:"One point of contact for everyday technology.",detail:"Practical support for computers, phones, tablets, printers, email, cloud services, backups, and device transitions.",tasks:["Device setup, troubleshooting, and refresh planning","Account, email, and cloud-service organization","Backup and recovery readiness"],result:"A more reliable personal technology environment."},
  {number:"02",title:"Executive & home office support",short:"Make work technology dependable wherever it is used.",detail:"Support for home offices, collaboration tools, remote access, connectivity, and travel-ready devices. Coordinate with existing corporate IT teams where required.",tasks:["Home office setup and reliability reviews","Secure access and productivity workflows","Device preparation for travel and transitions"],result:"Fewer disruptions to work and daily life."},
  {number:"03",title:"Privacy & security fundamentals",short:"Protect personal accounts and reduce avoidable risk.",detail:"Review account security, device configurations, recovery options, and privacy practices. Complex investigations or specialized protection needs are coordinated with appropriate qualified providers.",tasks:["Multi-factor authentication and password managers","Device updates, encryption, and secure backups","Account recovery and access documentation"],result:"Clear security priorities and practical protective controls."},
  {number:"04",title:"Home technology & vendor coordination",short:"One technical contact across multiple vendors.",detail:"Assess home Wi-Fi, networking, and connected systems; manage troubleshooting and coordinate qualified networking, AV, smart-home, or security installers when specialist work is needed.",tasks:["Connectivity troubleshooting and vendor escalation","Technology inventory and service documentation","Refresh planning and installation coordination"],result:"Less time spent managing disconnected vendors."},
];

const steps = [
  {step:"01",title:"Private consultation",body:"Identify the household, devices, priorities, support expectations, and privacy requirements."},
  {step:"02",title:"Technology assessment",body:"Document the environment, immediate problems, access boundaries, and practical improvements."},
  {step:"03",title:"Stabilize & organize",body:"Resolve agreed priorities, put essential controls in place, and establish a support process."},
  {step:"04",title:"Ongoing support",body:"Choose scoped assistance or a defined monthly arrangement with clear hours, response targets, and escalation."},
];

export default function PrivateITPage() {
 return <><SiteHeader/><main className={s.page}>
  <section className={s.hero}><div className={s.shell}>
    <p className={s.kicker}>ONETIME LABS / PRIVATE CLIENT SERVICES</p>
    <h1>Your technology, handled personally.</h1>
    <p>Discreet, white-glove technology support for executives, entrepreneurs, and private households. One trusted technical point of contact for the devices, accounts, and systems you rely on—without the complexity of a corporate help desk.</p>
    <div className={s.links}><Link className={s.button} href="/contact?topic=private-it">Request a private consultation <ArrowUpRight size={16}/></Link><Link href="/#other-services">Explore OneTime Labs <ArrowRight size={15}/></Link></div>
  </div></section>
  <section className={s.content}><div className={s.shell}><div className={s.heading}>
    <p>PERSONAL SERVICE / ENTERPRISE DISCIPLINE</p><h2>A single point of contact for your digital life.</h2>
    <span>Every engagement is defined around your needs. Whether it's a recurring technology headache or ongoing oversight, we handle what fits our expertise and coordinate trusted specialists for the rest.</span>
  </div><div className={s.list}>{services.map(x=><article key={x.number}><div className={s.left}><small>{x.number}</small><h3>{x.title}</h3><p>{x.short}</p></div><div className={s.right}><p>{x.detail}</p><ul>{x.tasks.map(t=><li key={t}><Check size={14}/>{t}</li>)}</ul><div className={s.deliverable}><b>Outcome:</b> {x.result}</div></div></article>)}</div></div></section>
  <section className={s.methods}><div className={s.shell}><div><p className={s.kicker}>SERVICE MODEL</p><h2>Personal attention. Clear expectations.</h2><p className={s.methodCopy}>Technology support should be predictable and accountable. Start with a focused assessment, then select one-time work or an ongoing relationship based on an agreed scope.</p></div>
    <div className={s.options}><article><Laptop size={25}/><h3>On-demand assistance</h3><p>Individual projects, technical assessments, setup, troubleshooting, and defined follow-up support.</p></article><article><ShieldCheck size={25}/><h3>Private technology concierge</h3><p>Ongoing oversight with mutually agreed availability, response times, confidentiality, and specialist coordination. No implied unlimited or 24/7 coverage.</p></article></div>
  </div></section>
  <section className={s.steps}><div className={s.shell}><div className={s.heading}><p>HOW IT WORKS</p><h2>Start small. Build trust.</h2></div><div className={s.stepGrid}>{steps.map(x=><article key={x.step}><span>{x.step}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div><p className={s.toolNote}>Remote engagements can be discussed nationally. On-site availability, travel, and any subcontracted work are agreed in advance. References, confidentiality arrangements, and service scope are addressed before access is granted.</p></div></section>
  <section className={s.cta}><div className={s.shell}><div><h2>Technology should make life easier.</h2><p>Tell us what needs attention. We'll discuss a practical, confidential scope of support.</p></div><Link className={s.button} href="/contact?topic=private-it">Request a consultation <ArrowUpRight size={16}/></Link></div></section>
 </main><SiteFooter/></>;
}
