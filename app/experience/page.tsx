import type {Metadata} from "next";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {founderExperience, founderMetrics, experienceDisclosure} from "@/lib/itam-site-copy";
import s from "./experience.module.css";

export const metadata:Metadata={title:"Experience Behind OneTime Labs",description:"Founder's previous ITAM, software licensing, CMDB, and infrastructure work at Allied Digital supporting Daimler Truck, Hewlett-Packard Enterprise supporting Bank of America, and SC Johnson."};
export default function ExperiencePage(){return <><SiteHeader/><main className={s.page}>
<section className={s.hero}><div className={s.shell}><p>FOUNDER'S PROFESSIONAL BACKGROUND</p><h1>Experience in complex environments, not just presentations about them.</h1><span>OneTime Labs is a separate business built on the founder's previous employment and contract assignments in enterprise asset management, licensing, device infrastructure, and operational systems.</span></div></section>
<section className={s.proof}><div className={s.shell}><p>SELECTED RESULTS FROM PRIOR ROLES</p><div className={s.numbers}>{founderMetrics.map(x=><article key={x.value}><strong>{x.value}</strong><span>{x.label}</span><small>{x.source}</small></article>)}</div></div></section>
<section className={s.details}><div className={s.shell}><h2>Where that experience comes from.</h2><div className={s.roles}>{founderExperience.map(x=><article key={x.organization}><div><h3>{x.organization}</h3><span>{x.context}</span></div><p>{x.detail}</p></article>)}</div><p className={s.disclaimer}>{experienceDisclosure}</p><Link href="/contact?topic=itam">Talk about your ITAM project <ArrowUpRight size={17}/></Link></div></section>
</main><SiteFooter/></>}
