import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const paths = [
  {
    href: "/business",
    icon: BriefcaseBusiness,
    label: "BUSINESS SOLUTIONS",
    title: "Websites, booking, job tracking, reporting, and automation — built around your operation.",
    services: "Customer portals · Scheduling · Internal tools · Dashboards · Integrations · Custom software",
    action: "Explore Business Solutions",
  },
  {
    href: "/enterprise",
    icon: Building2,
    label: "ENTERPRISE SOLUTIONS",
    title: "Migrate, integrate, automate, and build across complex technology environments.",
    services: "Vendor migration · Contact center · Managed print · ITAM / SAM · Internal platforms · Custom software",
    action: "Explore Enterprise Solutions",
  },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-home">
        <section className="otl-shell otl-compact-choice" aria-label="Choose a OneTime Labs service area">
          <div className="otl-compact-choice-label">CHOOSE A SERVICE AREA</div>

          <div className="otl-compact-choice-grid">
            {paths.map(({ href, icon: Icon, label, title, services, action }) => (
              <Link className="otl-compact-choice-card" href={href} key={href}>
                <div className="otl-compact-choice-top">
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </div>
                <h1>{title}</h1>
                <p>{services}</p>
                <strong>{action} <ArrowRight size={14} /></strong>
              </Link>
            ))}
          </div>

          <div className="otl-compact-help">
            <span>Not sure where your project fits?</span>
            <Link href="/contact">Tell us what you need <ArrowRight size={13} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
