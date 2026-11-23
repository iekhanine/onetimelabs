import type {Metadata} from "next";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {founderExperience, founderMetrics} from "@/lib/itam-site-copy";
import s from "./experience.module.css";

export const metadata:Metadata={title:"Experience Behind OneTime Labs",description:"Enterprise IT asset management, software licensing, CMDB, and infrastructure experience across complex organizations."};
export default function ExperiencePage(){return <><SiteHeader/><main className={s.page}>
<section className={s.hero}><div className={s.shell}><p>FOUNDER'S PROFESSIONAL BACKGROUND</p><h1>Experience in complex environments, not just presentations about them.</h1><span>Practical experience with enterprise asset management, software licensing, device infrastructure, and operational systems in demanding environments.</span></div></section>
<section className={s.proof}><div className={s.shell}><p>SELECTED ENTERPRISE RESULTS</p><div className={s.numbers}>{founderMetrics.map(x=><article key={x.value}><strong>{x.value}</strong><span>{x.label}</span><small>{x.source}</small></article>)}</div></div></section>
<section className={s.details}><div className={s.shell}><h2>Experience across enterprise environments.</h2><div className={s.roles}>{founderExperience.map(x=><article key={x.organization}><div><h3>{x.organization}</h3><span>{x.context}</span></div><p>{x.detail}</p></article>)}</div><Link href="/contact?topic=itam">Talk about your ITAM project <ArrowUpRight size={17}/></Link></div></section>
</main><SiteFooter/></>}
