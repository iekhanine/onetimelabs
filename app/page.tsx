import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MarketingBumper } from "@/components/MarketingBumper";

const photos = {
  smallBusiness: "https://images.unsplash.com/photo-1743574729836-8e02167d4350?auto=format&fit=crop&w=1800&q=82",
  enterprise: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=82",
  shop: "https://images.unsplash.com/photo-1774796425589-c9cf9c919de9?auto=format&fit=crop&w=1800&q=82",
  office: "https://images.unsplash.com/photo-1742198810079-49bb51d1c5af?auto=format&fit=crop&w=1800&q=82",
  warehouse: "https://images.unsplash.com/photo-1709804668113-8b2453ae129a?auto=format&fit=crop&w=1800&q=82",
  planning: "https://images.unsplash.com/photo-1761914410572-02614b575847?auto=format&fit=crop&w=1800&q=82",
} as const;

const paths = [
  {
    href: "/business",
    icon: BriefcaseBusiness,
    label: "SMALL & MIDSIZE BUSINESS",
    title: "Keep jobs, customers, schedules, paperwork, and follow-ups from becoming a daily mess.",
    services: "Jobs · Customers · Scheduling · Inventory · Paperwork · Billing",
    action: "Explore Business Solutions",
    image: photos.smallBusiness,
  },
  {
    href: "/enterprise",
    icon: Building2,
    label: "ENTERPRISE",
    title: "Plan, migrate, modernize, and support the technology your organization depends on.",
    services: "Vendor Migrations · Contact Center · Managed Print Services · ITAM / SAM · Internal Platforms · Custom Software",
    action: "Explore Enterprise Solutions",
    image: photos.enterprise,
  },
] as const;

const visualHighlights = [
  {
    href: "/business",
    image: photos.shop,
    label: "SMALL BUSINESS",
    title: "Tools built around the way the business actually runs.",
  },
  {
    href: "/custom-development",
    image: photos.office,
    label: "CUSTOM DEVELOPMENT",
    title: "Practical internal systems without another bloated platform.",
  },
  {
    href: "/enterprise",
    image: photos.warehouse,
    label: "IT ASSET MANAGEMENT",
    title: "Know what you have, where it is, and what it is costing you.",
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

          <div className="otl-compact-choice-grid otl-compact-choice-grid--visual">
            {paths.map(({ href, icon: Icon, label, title, services, action, image }) => (
              <Link className="otl-compact-choice-card otl-compact-choice-card--visual" href={href} key={href}>
                <div className="otl-compact-choice-photo" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
                <div className="otl-compact-choice-body">
                  <div className="otl-compact-choice-top">
                    <Icon size={20} aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                  <h1>{title}</h1>
                  <p>{services}</p>
                  <strong>{action} <ArrowRight size={14} /></strong>
                </div>
              </Link>
            ))}
          </div>

          <div className="otl-compact-help">
            <span>Not sure where your project fits?</span>
            <Link href="/contact">Tell us what you need <ArrowRight size={13} /></Link>
          </div>

          <section className="otl-home-visuals" aria-label="Examples of the environments OneTime Labs supports">
            <div className="otl-home-visual-grid">
              {visualHighlights.map(({ href, image, label, title }) => (
                <Link className="otl-home-visual-card" href={href} key={href + image}>
                  <div className="otl-home-visual-image" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
                  <div className="otl-home-visual-copy">
                    <span>{label}</span>
                    <h3>{title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="otl-home-assessments" aria-label="Free technology assessments">
            <div className="otl-home-assessment-grid">
              <Link className="otl-home-assessment-card" href="/assess/vendor-migration">
                <div className="otl-home-assessment-visual" style={{ backgroundImage: `url(${photos.enterprise})` }} aria-hidden="true" />
                <div className="otl-home-assessment-content">
                  <span>VENDOR MIGRATION</span>
                  <h3>Migration Risk Assessment</h3>
                  <p>25 questions covering scope, dependencies, access, testing, rollback, and operational handoff.</p>
                  <strong>Get your risk score <ArrowRight size={14} /></strong>
                </div>
              </Link>

              <Link className="otl-home-assessment-card" href="/assess/itam">
                <div className="otl-home-assessment-visual" style={{ backgroundImage: `url(${photos.planning})` }} aria-hidden="true" />
                <div className="otl-home-assessment-content">
                  <span>IT ASSET MANAGEMENT</span>
                  <h3>ITAM Maturity Assessment</h3>
                  <p>Measure governance, inventory quality, lifecycle controls, software, contracts, risk, and optimization.</p>
                  <strong>Get your maturity score <ArrowRight size={14} /></strong>
                </div>
              </Link>
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
