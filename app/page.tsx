import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Box, CheckCircle2, ClipboardCheck,
  Database, HardDrive, Layers3, ScanLine, ShieldCheck, Workflow,
} from "lucide-react";
import s from "./home.module.css";
import {
  companyTagline, siteCopy, itamServices, recordOptions,
  deliverySteps, founderMetrics, founderExperience,
  experienceDisclosure, adjacentServices, adjacentLinks,
} from "@/lib/itam-site-copy";

const serviceIcons = [HardDrive, ShieldCheck, Database, ScanLine, Workflow, ClipboardCheck];

export default function Home() {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={s.container}>
          <Link className={s.brand} href="/" aria-label="OneTime Labs — home">
            <Image src="/brand/otl-mark.png" alt="" width={40} height={40} priority />
            <span>OneTime <b>Labs</b></span>
          </Link>
          <nav className={s.nav} aria-label="Primary navigation">
            <a href="#itam">ITAM services</a>
            <a href="#approach">How we work</a>
            <a href="#experience">Experience</a>
            <a href="#other-services">Other services</a>
          </nav>
          <Link href="/contact?topic=itam" className={s.headerCta}>Let's talk <ArrowUpRight size={16} /></Link>
        </div>
      </header>

      <main>
        <section className={s.hero}>
          <div className={s.container}>
            <div className={s.heroText}>
              <p className={s.eyebrow}>{siteCopy.eyebrow}</p>
              {companyTagline ? <p className={s.tagline}>{companyTagline}</p> : null}
              <h1>{siteCopy.heroTitle}</h1>
              <p className={s.heroDescription}>{siteCopy.heroDescription}</p>
              <div className={s.actions}>
                <Link className={s.primaryCta} href="/contact?topic=itam">{siteCopy.heroPrimary}<ArrowUpRight size={18}/></Link>
                <a className={s.secondaryCta} href="#itam">{siteCopy.heroSecondary}<ArrowRight size={16}/></a>
              </div>
              <p className={s.heroNote}><CheckCircle2 size={15} /> Work in your existing systems, or build an asset register that fits.</p>
            </div>
            <aside className={s.heroVisual} aria-label="Illustration of managed asset lifecycle">
              <div className={s.heroVisualTop}><span>WHAT WE MANAGE</span><span>01 — 05</span></div>
              <div className={s.heroVisualTitle}>The full asset lifecycle.</div>
              <div className={s.lifecycle}>
                {[
                  {n:"01",title:"Acquire",sub:"Request · purchase · receive"},
                  {n:"02",title:"Deploy",sub:"Tag · configure · assign"},
                  {n:"03",title:"Maintain",sub:"Verify · reconcile · repair"},
                  {n:"04",title:"Recover",sub:"Transfer · reclaim · refresh"},
                  {n:"05",title:"Retire",sub:"Sanitize · dispose · evidence"},
                ].map((x,i)=><div className={s.lifecycleRow} key={x.n}><span className={s.lifecycleNum}>{x.n}</span><span className={s.lifecycleRule} aria-hidden="true"/><div><strong>{x.title}</strong><small>{x.sub}</small></div><span className={s.lifecycleDot} aria-hidden="true"/>{i<4?<span className={s.lifecycleLine} aria-hidden="true"/>:null}</div>)}
              </div>
              <div className={s.heroVisualBottom}><Database size={16}/><span>Asset records, ownership & evidence stay in a governed system of record.</span></div>
            </aside>
          </div>
        </section>

        <section className={s.metrics} aria-label="Founder's past enterprise experience metrics">
          <div className={s.container}>
            <div className={s.metricsHeading}><span className={s.label}>FOUNDER EXPERIENCE</span><p>Selected figures from prior enterprise roles and assignments—not OneTime Labs client results.</p></div>
            <div className={s.metricsGrid}>{founderMetrics.map(m=><div className={s.metric} key={m.value}><strong>{m.value}</strong><span>{m.label}</span><small>{m.source}</small></div>)}</div>
          </div>
        </section>

        <section className={s.services} id="itam">
          <div className={s.container}>
            <div className={s.sectionHeading}>
              <div><p className={s.label}>OUR PRIMARY FOCUS / ITAM</p><h2>{siteCopy.capabilityHeadline}</h2></div>
              <p>{siteCopy.capabilityIntro}</p>
            </div>
            <div className={s.serviceGrid}>
              {itamServices.map((service,i)=>{const Icon=serviceIcons[i];return <article className={s.serviceCard} key={service.number}>
                <div className={s.serviceMeta}><span>{service.number}</span><Icon size={21} strokeWidth={1.55}/></div>
                <h3>{service.title}</h3>
                <p className={s.serviceShort}>{service.short}</p>
                <p className={s.serviceDetail}>{service.detail}</p>
                <div className={s.serviceTasks}><strong>Typical work</strong>{service.tasks.map(task=><div key={task}><span className={s.taskDot}/>{task}</div>)}</div>
                <p className={s.serviceOutput}><span>RESULT</span>{service.output}</p>
              </article>})}
            </div>
            <div className={s.serviceBottom}><span>Need an asset program built or repaired end to end?</span><Link href="/services/itam">Explore our ITAM approach <ArrowUpRight size={17}/></Link></div>
          </div>
        </section>

        <section className={s.platform} id="platform">
          <div className={s.container}>
            <div className={s.platformIntro}><p className={s.label}>SYSTEMS & IMPLEMENTATION</p><h2>{siteCopy.platformHeadline}</h2><p>{siteCopy.platformIntro}</p><div className={s.platformStack}><span>ServiceNow</span><span>Flexera</span><span>Intune</span><span>ITSM / CMDB</span><span>Asset databases</span><span>Integrations</span></div><small>Platforms represent professional experience or implementation options, not vendor partnerships.</small></div>
            <div className={s.platformOptions}>{recordOptions.map((x,i)=><article key={x.title}><div className={s.optionHeader}><span>0{i+1}</span>{i===0?<Layers3 size={23}/>:<Database size={23}/>}</div><h3>{x.title}</h3><p>{x.body}</p><div className={s.optionNote}>{x.note}</div></article>)}</div>
          </div>
        </section>

        <section className={s.process} id="approach">
          <div className={s.container}><div className={s.sectionHeading}><div><p className={s.label}>HOW WE WORK</p><h2>{siteCopy.processHeadline}</h2></div><p>Assessments are the starting point—not the end product. The objective is a system and operating process that your team can maintain.</p></div><div className={s.processSteps}>{deliverySteps.map(x=><div key={x.step}><span>{x.step}</span><h3>{x.title}</h3><p>{x.body}</p></div>)}</div></div>
        </section>

        <section className={s.experience} id="experience">
          <div className={s.container}>
            <div className={s.experienceHeading}><div><p className={s.label}>THE EXPERIENCE BEHIND THE WORK</p><h2>Enterprise-scale experience. Applied where it counts.</h2><p>OneTime Labs is built on hands-on asset, licensing, and infrastructure work in complex organizations. That work was performed in previous employment and contract roles.</p></div><Link href="/experience">More about our experience <ArrowUpRight size={16}/></Link></div>
            <div className={s.experienceList}>{founderExperience.map(x=><article key={x.organization}><div><strong>{x.organization}</strong><span>{x.context}</span></div><p>{x.detail}</p></article>)}</div>
            <p className={s.experienceDisclaimer}>{experienceDisclosure}</p>
          </div>
        </section>

        <section className={s.adjacent} id="other-services">
          <div className={s.container}><div className={s.sectionHeading}><div><p className={s.label}>BEYOND ITAM</p><h2>{siteCopy.adjacentHeadline}</h2></div><p>{siteCopy.adjacentIntro}</p></div><div className={s.adjacentGrid}>{adjacentServices.map((x,i)=><article key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div><div className={s.extraLinks}>{adjacentLinks.map(x=><Link href={x.href} key={x.href}>{x.label}<ArrowUpRight size={15}/></Link>)}</div></div>
        </section>

        <section className={s.finalCta}><div className={s.container}><div><p className={s.label}>LET'S TALK ABOUT YOUR ENVIRONMENT</p><h2>{siteCopy.closingHeadline}</h2><p>{siteCopy.closingBody}</p></div><Link href="/contact?topic=itam" className={s.primaryCta}>Start a conversation <ArrowUpRight size={18}/></Link></div></section>
      </main>
      <footer className={s.footer}><div className={s.container}><div className={s.footerLeft}><Image src="/brand/otl-mark.png" width={31} height={31} alt=""/><div><b>OneTime Labs</b><span>{siteCopy.specialty}</span></div></div><nav aria-label="Footer links"><Link href="/services/itam">ITAM</Link><Link href="/itam">30-day ITAM checklist</Link><Link href="/business">Other services</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><small>© {new Date().getFullYear()} OneTime Labs</small></div></footer>
    </div>
  );
}
