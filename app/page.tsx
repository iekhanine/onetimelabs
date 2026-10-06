import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness, CalendarDays, Gauge, Scissors } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MarketingBumper } from "@/components/MarketingBumper";
import { assessments } from "@/lib/assessments";

const photos = {
  smallBusiness: "https://images.unsplash.com/photo-1743574729836-8e02167d4350?auto=format&fit=crop&w=1800&q=82",
  enterprise: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=82",
  shop: "https://images.unsplash.com/photo-1774796425589-c9cf9c919de9?auto=format&fit=crop&w=1800&q=82",
  office: "https://images.unsplash.com/photo-1742198810079-49bb51d1c5af?auto=format&fit=crop&w=1800&q=82",
  warehouse: "https://images.unsplash.com/photo-1709804668113-8b2453ae129a?auto=format&fit=crop&w=1800&q=82",
} as const;

const systemDemos = [
  {
    href: "/layouts/clean-service",
    icon: CalendarDays,
    title: "Local Service",
    detail: "Booking · schedules · customer records",
  },
  {
    href: "/layouts/workshop-dark",
    icon: Gauge,
    title: "Performance Shop",
    detail: "Appointments · vehicles · service workflow",
  },
  {
    href: "/layouts/editorial-studio",
    icon: Scissors,
    title: "Modern Salon",
    detail: "Stylists · booking · gallery · client records",
  },
] as const;

const visualHighlights = [
  {
    href: "/business",
    image: photos.shop,
    label: "SMALL BUSINESS",
    title: "Tools built around the way the business runs.",
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
          <Link className="otl-home-assessment-library otl-home-assessment-library--featured" href="/assess">
            <div>
              <span>FREE ASSESSMENT LIBRARY</span>
              <h2>{Object.keys(assessments).length} practical company technology assessments. Free.</h2>
              <p>Security, IT operations, cloud, asset management, vendor management, service delivery, AI readiness, governance, and more.</p>
            </div>
            <strong>Browse all assessments <ArrowRight size={16} /></strong>
          </Link>

          <div className="otl-compact-choice-label">CHOOSE A SERVICE AREA</div>

          <div className="otl-compact-choice-grid otl-compact-choice-grid--visual">
            <article className="otl-compact-choice-card otl-compact-choice-card--visual otl-smb-card">
              <Link href="/business" className="otl-compact-choice-main-link" aria-label="Explore Small and Midsize Business solutions">
                <div className="otl-compact-choice-photo" style={{ backgroundImage: `url(${photos.smallBusiness})` }} aria-hidden="true" />
              </Link>

              <div className="otl-compact-choice-body">
                <Link href="/business" className="otl-compact-choice-main-link">
                  <div className="otl-compact-choice-top">
                    <BriefcaseBusiness size={20} aria-hidden="true" />
                    <span>SMALL &amp; MIDSIZE BUSINESS</span>
                  </div>
                  <h1>Keep jobs, customers, schedules, paperwork, and follow-ups from becoming a daily mess.</h1>
                  <p>Jobs · Customers · Scheduling · Inventory · Paperwork · Billing</p>
                  <strong>Explore Business Solutions <ArrowRight size={14} /></strong>
                </Link>

                <div className="otl-smb-systems">
                  <div className="otl-smb-systems-heading">
                    <div>
                      <span>CUSTOM TOOLS &amp; SCHEDULING SYSTEMS</span>
                      <h2>See what a purpose-built customer system can look like.</h2>
                    </div>
                    <Link href="/layouts">Explore live demos <ArrowRight size={13} /></Link>
                  </div>

                  <div className="otl-smb-system-grid">
                    {systemDemos.map(({ href, icon: Icon, title, detail }) => (
                      <Link className="otl-smb-system-tile" href={href} key={href}>
                        <Icon size={16} aria-hidden="true" />
                        <div>
                          <strong>{title}</strong>
                          <span>{detail}</span>
                        </div>
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <Link className="otl-compact-choice-card otl-compact-choice-card--visual" href="/enterprise">
              <div className="otl-compact-choice-photo" style={{ backgroundImage: `url(${photos.enterprise})` }} aria-hidden="true" />
              <div className="otl-compact-choice-body">
                <div className="otl-compact-choice-top">
                  <Building2 size={20} aria-hidden="true" />
                  <span>ENTERPRISE</span>
                </div>
                <h1>Plan, migrate, modernize, and support the technology your organization depends on.</h1>
                <p>Vendor Migrations · Contact Center · Managed Print Services · ITAM / SAM · Internal Platforms · Custom Software</p>
                <strong>Explore Enterprise Solutions <ArrowRight size={14} /></strong>
              </div>
            </Link>
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
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
