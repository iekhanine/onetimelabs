import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Network,
  Printer,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { enterpriseExperience } from "@/lib/company";
import styles from "./home.module.css";

const services = [
  {
    href: "/vendor-migration",
    icon: Network,
    title: "Vendor Migration",
    description:
      "Changing technology providers? We document what you have, plan the move, manage cutover, verify the new environment, and hand it back cleanly.",
    detail: "Provider changes · platform moves · multi-site cutovers",
  },
  {
    href: "/managed-print-services",
    icon: Printer,
    title: "Managed Print Services",
    description:
      "We assess and improve large printer environments: devices, print servers, management tools, reporting, standards, and provider transitions.",
    detail: "PrinterLogic · Web JetAdmin · Streamline NX · print servers",
  },
  {
    href: "/consulting",
    icon: BriefcaseBusiness,
    title: "Enterprise IT Consulting",
    description:
      "We clean up difficult IT environments: hardware and software records, licensing, ServiceNow data, technical standards, and stalled projects.",
    detail: "ITAM · SAM · CMDB · ServiceNow · architecture",
  },
  {
    href: "/custom-development",
    icon: Code2,
    title: "Custom Business Software",
    description:
      "When off-the-shelf software does not fit the job, we build the missing tool around the way your company actually works.",
    detail: "Internal tools · workflows · dashboards · integrations",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`otl-shell ${styles.heroInner}`}>
            <div>
              <span className={styles.kicker}>ENTERPRISE TECHNOLOGY CONSULTING</span>
              <h1>…to new technology.</h1>
              <p className={styles.heroLead}>
                We help companies replace vendors, systems, and tools without turning the change
                into chaos. We plan the move, do the technical work, verify it works, and leave the
                new environment documented for the people who have to run it.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  Start a project <ArrowRight size={14} />
                </Link>
                <Link className={styles.secondaryButton} href="#services">
                  What we do
                </Link>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Common OneTime Labs projects">
              <div className={styles.heroPanelRow}>
                <strong>Changing vendors?</strong>
                <span>We map the old environment and move you to the new one.</span>
              </div>
              <div className={styles.heroPanelRow}>
                <strong>Managed Print Services getting messy?</strong>
                <span>We sort out the fleet, servers, tools, data, and provider model.</span>
              </div>
              <div className={styles.heroPanelRow}>
                <strong>Need software that does not exist?</strong>
                <span>We build focused internal tools around the actual workflow.</span>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.services} id="services">
          <div className="otl-shell">
            <div className={styles.sectionHead}>
              <span className="otl-eyebrow otl-eyebrow-dark">WHAT WE DO</span>
              <h2>The problems companies bring us.</h2>
              <p>
                You do not need to know the consulting terminology. If a vendor, system, process,
                or internal tool is becoming a problem, start there.
              </p>
            </div>

            <div className={styles.serviceGrid}>
              {services.map(({ href, icon: Icon, title, description, detail }) => (
                <Link className={styles.serviceCard} href={href} key={title}>
                  <div className={styles.serviceIcon}><Icon size={18} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className={styles.serviceDetail}>{detail}</span>
                  <span className={styles.serviceLink}>Learn more <ArrowRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.experience}>
          <div className={`otl-shell ${styles.experienceGrid}`}>
            <div className={styles.experienceCopy}>
              <span className={styles.kicker}>ENTERPRISE EXPERIENCE</span>
              <h2>Experience from environments where mistakes get expensive.</h2>
              <p>
                The work behind OneTime Labs comes from large enterprise environments involving
                thousands of users, devices, vendors, assets, licenses, locations, and support teams.
                That experience is what we bring to smaller teams and focused enterprise projects.
              </p>
              <Link className={styles.experienceLink} href="/experience">
                View enterprise experience <ArrowRight size={13} />
              </Link>
            </div>

            <div className={styles.companyBox}>
              <div className={styles.companyGrid} aria-label="Prior professional environments">
                {enterpriseExperience.map((company) => <strong key={company}>{company}</strong>)}
              </div>
              <p className={styles.companyNote}>
                Prior professional experience and engagements. Organizations shown are not presented
                as current OneTime Labs clients, partners, or sponsors.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.lower}>
          <div className={`otl-shell ${styles.lowerGrid}`}>
            <article className={styles.infoCard}>
              <span className="otl-eyebrow otl-eyebrow-dark">SOFTWARE</span>
              <h2>We build tools too.</h2>
              <p>
                OTLES, ChangeOps, PCCR, licensing systems, asset-management tools, and custom
                internal applications built from real operational problems.
              </p>
              <Link href="/software">View software <ArrowRight size={13} /></Link>
            </article>

            <article className={styles.infoCard}>
              <span className="otl-eyebrow otl-eyebrow-dark">PRICING</span>
              <h2>Clear rates. Scoped projects.</h2>
              <p>
                Remote consulting starts at <strong>$175/hour</strong>, onsite at <strong>$225/hour</strong>,
                with fixed project pricing available for larger work.
              </p>
              <Link href="/pricing">View pricing <ArrowRight size={13} /></Link>
            </article>
          </div>
        </section>

        <section className={styles.contact}>
          <div className={`otl-shell ${styles.contactInner}`}>
            <div>
              <span className={styles.kicker}>RACINE · MILWAUKEE · CHICAGO · REMOTE / NATIONAL</span>
              <h2>Tell us what needs to change.</h2>
              <p>Vendor, print environment, IT operations, or software—we can start with the problem.</p>
            </div>
            <Link className={styles.primaryButton} href="/contact">
              Contact OneTime Labs <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
