import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MarketingBumper } from "@/components/MarketingBumper";

const paths = [
  {
    href: "/business",
    icon: BriefcaseBusiness,
    label: "SMALL & MIDSIZE BUSINESS",
    title: "Keep jobs, customers, schedules, paperwork, and follow-ups from becoming a daily mess.",
    services: "Jobs · Customers · Scheduling · Inventory · Paperwork · Billing",
    action: "Explore Business Solutions",
  },
  {
    href: "/enterprise",
    icon: Building2,
    label: "ENTERPRISE",
    title: "Plan, migrate, modernize, and support the technology your organization depends on.",
    services: "Vendor Migrations · Contact Center · Managed Print Services · ITAM / SAM · Internal Platforms · Custom Software",
    action: "Explore Enterprise Solutions",
  },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-home">
        <div className="otl-home-bumper-zone">
          <div className="otl-shell otl-home-bumper-inner">
            <MarketingBumper />
          </div>
        </div>

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
