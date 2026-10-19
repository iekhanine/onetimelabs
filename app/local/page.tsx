import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardCheck, FileSpreadsheet, Globe2, LayoutDashboard, Sparkles, Wrench, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { LocalLeadForm } from "./LocalLeadForm";
import styles from "./local.module.css";

export const metadata: Metadata = {
  title: "Racine & Milwaukee Small Business Technology Help | OneTime Labs",
  description: "Websites, booking, customer check-in, inventory and automation for local businesses in Racine and Milwaukee. Tell us what you need—no technical explanation required.",
  alternates: { canonical: "/local" },
  openGraph: { title: "Less busywork. More business. | OneTime Labs", description: "Practical technology built around your business, not the other way around.", url: "/local" },
};

const services = [
  { icon: CalendarDays, title: "Online booking", text: "Make scheduling easier for you and your customers.", href: "/business" },
  { icon: ClipboardCheck, title: "Customer check-in", text: "Know who's waiting, who's next, and what's done.", href: "/custom-development" },
  { icon: FileSpreadsheet, title: "Spreadsheet rescue", text: "Replace repetitive copying, tracking, and guesswork.", href: "/business" },
  { icon: Globe2, title: "Websites that work", text: "A clean site that helps people actually reach you.", href: "/custom-development" },
  { icon: LayoutDashboard, title: "Inventory & dashboards", text: "See jobs, stock, and important numbers in one place.", href: "/software" },
  { icon: Wrench, title: "Something else?", text: "Tell us the headache. We'll explore the solution.", href: "/contact?topic=business" },
];

export default function LocalLandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell + " " + styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="OneTime Labs home">
            <Image src="/brand/otl-mark.png" alt="" width={38} height={38} priority />
            <span><strong>OneTime Labs</strong><small>LOCAL BUSINESS TECHNOLOGY</small></span>
          </Link>
          <nav aria-label="Landing page navigation" className={styles.nav}>
            <a href="#solutions">What we do</a><a href="#how-it-works">How it works</a><Link href="/assess">Free assessment</Link>
          </nav>
          <a href="#talk" className={styles.topButton}>Let's talk <ArrowRight size={16}/></a>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.shell + " " + styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.pill}><span className={styles.dot}/> Serving Racine, Milwaukee & beyond</div>
              <h1>Running your business on <em>spreadsheets, duct tape, and determination?</em></h1>
              <p>Let's make the everyday stuff easier. We build straightforward websites, booking tools, customer systems, and automations that fit the way <strong>your</strong> business works.</p>
              <div className={styles.actions}><a href="#talk" className={styles.primary}>Tell us what you need <ArrowRight size={18}/></a><a href="#solutions" className={styles.secondary}>See what we can help with</a></div>
              <div className={styles.heroFoot}><CheckCircle2 size={17}/> Small-business friendly <span>·</span> No technical jargon <span>·</span> No obligation to ask</div>
            </div>
            <div className={styles.heroArt} aria-label="Illustration of scattered business tasks becoming one organized workflow" role="img">
              <div className={styles.artGrid}/>
              <div className={styles.floatingTop}>Before <span>12 tabs · 6 spreadsheets · 1 headache</span></div>
              <div className={styles.dashboard}>
                <div className={styles.dashHeader}><span><i/> <i/> <i/></span><strong>Your business, organized.</strong><Sparkles size={16}/></div>
                <div className={styles.dashRow}><span className={styles.dashIcon}><CalendarDays size={20}/></span><div><b>Today's appointments</b><small>Everything in one place</small></div><strong>08</strong></div>
                <div className={styles.dashRow}><span className={styles.dashIcon}><ClipboardCheck size={20}/></span><div><b>Customers checked in</b><small>Easy to keep track</small></div><strong>05</strong></div>
                <div className={styles.dashRow}><span className={styles.dashIcon}><LayoutDashboard size={20}/></span><div><b>Open work orders</b><small>No more digging through files</small></div><strong>03</strong></div>
                <div className={styles.dashBottom}><span className={styles.greenDot}/> Systems looking good <span>Example interface</span></div>
              </div>
              <div className={styles.floatingBottom}><CheckCircle2 size={17}/> Less busywork. More business.</div>
            </div>
          </div>
        </section>

        <section id="solutions" className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}><div><span className={styles.eyebrow}>WAYS WE CAN HELP</span><h2>Small fixes. Big difference.</h2><p>You don't need an IT department to make things run better.</p></div><Link href="/business" className={styles.inlineLink}>All business solutions <ArrowRight size={16}/></Link></div>
            <div className={styles.serviceGrid}>{services.map(({icon:Icon, title, text, href})=><Link href={href} className={styles.serviceCard} key={title}><span className={styles.serviceIcon}><Icon size={22}/></span><h3>{title}</h3><p>{text}</p><span className={styles.cardArrow}><ArrowRight size={17}/></span></Link>)}</div>
          </div>
        </section>

        <section className={styles.philosophy}><div className={styles.shell + " " + styles.philosophyInner}><div><span className={styles.eyebrow}>A DIFFERENT WAY TO BUILD</span><h2>You shouldn't need another expensive subscription for everything.</h2></div><div><p>We focus on practical, right-sized solutions. Whenever feasible, you can buy your software once and own it, with any ongoing hosting or support costs explained upfront.</p><Link href="/pricing" className={styles.inlineLink}>Explore our approach <ArrowRight size={16}/></Link></div></div></section>

        <section id="how-it-works" className={styles.section}><div className={styles.shell}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>SUPER SIMPLE</span><h2>How getting started works</h2></div></div><div className={styles.steps}><div><span>01</span><h3>Tell us the problem</h3><p>Even “I wish this were easier” is enough.</p></div><div><span>02</span><h3>Talk through options</h3><p>We find a sensible solution and agree on scope and price.</p></div><div><span>03</span><h3>Make it useful</h3><p>Get a tool that fits your workflow, not the other way around.</p></div></div></div></section>

        <section id="talk" className={styles.contactSection}><div className={styles.shell + " " + styles.contactGrid}><div className={styles.contactCopy}><span className={styles.eyebrow}>LET'S TALK</span><h2>What's the one thing you wish worked better?</h2><p>Tell me a little about your business. You don't need a technical plan or a budget figured out to start the conversation.</p><div className={styles.contactSignature}><span className={styles.avatar}>IK</span><span><strong>Ivan · OneTime Labs</strong><small>Local, independent, and happy to talk through ideas.</small></span></div><a href="/assess" className={styles.assessLink}>Not sure where to start? Try the free technology assessment <ArrowRight size={16}/></a></div><LocalLeadForm/></div></section>

        <section className={styles.explore}><div className={styles.shell}><span className={styles.eyebrow}>KEEP EXPLORING</span><div className={styles.exploreLinks}><Link href="/assess">Free technology assessment <ArrowRight size={16}/></Link><Link href="/software">Explore our software <ArrowRight size={16}/></Link><Link href="/business">Business solutions <ArrowRight size={16}/></Link><Link href="/">OneTime Labs home <ArrowRight size={16}/></Link></div></div></section>
      </main>
      <SiteFooter/>
    </div>
  );
}
