import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight, ArrowUpRight, Check, Database, Workflow} from "lucide-react";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {itamServices, deliverySteps, recordOptions, siteCopy} from "@/lib/itam-site-copy";
import s from "./services.module.css";

export const metadata: Metadata={
 title:"IT Asset Management Services | HAM, SAM & CMDB",
 description:"ITAM consulting and implementation: hardware asset management, software licensing, CMDB governance, inventory reconciliation, and lifecycle automation.",
};
export default function ITAMServicesPage(){return <><SiteHeader/><main className={s.page}>
 <section className={s.hero}><div className={s.shell}><p className={s.kicker}>IT ASSET MANAGEMENT SERVICES</p><h1>Asset management that works after the project ends.</h1><p>{siteCopy.heroDescription}</p><div className={s.links}><Link className={s.button} href="/contact?topic=itam">Discuss your environment <ArrowUpRight size={16}/></Link><Link href="/#itam">Back to overview <ArrowRight size={15}/></Link></div></div></section>
 <section className={s.content}><div className={s.shell}><div className={s.heading}><p>WHAT WE CAN TAKE ON</p><h2>Scoped services or an end-to-end program.</h2><span>Start with one asset class, one dataset, or a full ITAM operating model. The work is defined around your platforms, control gaps, and business requirements.</span></div>
 <div className={s.list}>{itamServices.map(x=><article key={x.number}><div className={s.left}><small>{x.number}</small><h3>{x.title}</h3><p>{x.short}</p></div><div className={s.right}><p>{x.detail}</p><ul>{x.tasks.map(t=><li key={t}><Check size={14}/>{t}</li>)}</ul><div className={s.deliverable}><b>What changes:</b> {x.output}</div></div></article>)}</div></div></section>
 <section className={s.methods}><div className={s.shell}><div><p className={s.kicker}>PLATFORM OPTIONS</p><h2>Build what you need. Keep what already works.</h2><p className={s.methodCopy}>{siteCopy.platformIntro}</p></div><div className={s.options}>{recordOptions.map((x,i)=><article key={x.title}>{i===0?<Workflow size={25}/>:<Database size={25}/>}<h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section>
 <section className={s.steps}><div className={s.shell}><div className={s.heading}><p>DELIVERY</p><h2>Four practical stages.</h2></div><div className={s.stepGrid}>{deliverySteps.map(x=><article key={x.step}><span>{x.step}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div><p className={s.toolNote}>Prefer to assess your current program first? Our <Link href="/itam">public 30-day ITAM checklist</Link> is also available as a separate planning tool.</p></div></section>
 <section className={s.cta}><div className={s.shell}><div><h2>Tell us what's not adding up.</h2><p>We'll start with your environment, existing data, and what needs to change.</p></div><Link className={s.button} href="/contact?topic=itam">Contact OneTime Labs <ArrowUpRight size={16}/></Link></div></section>
 </main><SiteFooter/></>}
