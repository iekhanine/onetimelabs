import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  Code2,
  Headphones,
  Network,
  Printer,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { enterpriseExperience } from "@/lib/company";

export const metadata: Metadata = {
  title: "Enterprise Technology Consulting",
  description:
    "Vendor migrations, contact center platforms, managed print, ITAM/SAM, architecture, governance, and custom enterprise software from OneTime Labs.",
};

const services = [
  {
    href: "/vendor-migration",
    icon: Network,
    title: "Vendor Migration",
    detail: "Discovery, dependency mapping, transition planning, cutover, validation, and handoff.",
  },
  {
    href: "/managed-print-services",
    icon: Printer,
    title: "Managed Print Services",
    detail: "Fleet strategy, print infrastructure, tooling, governance, and MPS transitions.",
  },
  {
    href: "/experience#contact-center",
    icon: Headphones,
    title: "Contact Center Platforms",
    detail: "Five9 → Genesys transition management across ACD queue and agent routing, agent assignments, transfer and escalation paths, IVR/IVA call flows, call recording / ACR, migration validation, and production troubleshooting.",
  },
  {
    href: "/services/itam",
    icon: Boxes,
    title: "IT Asset Management (ITAM / SAM)",
    detail: "Asset management, licensing, CMDB, standards, governance, and operational cleanup.",
  },
  {
    href: "/consulting",
    icon: BriefcaseBusiness,
    title: "Architecture & Delivery",
    detail: "Technical planning, implementation support, project recovery, and senior consulting.",
  },
  {
    href: "/custom-development",
    icon: Code2,
    title: "Internal Platforms & Software",
    detail: "Internal tools, workflow systems, integrations, automation, and purpose-built applications.",
  },
] as const;

export default function EnterprisePage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-section-page">
        <section className="otl-compact-section-hero otl-compact-section-hero--enterprise">
          <div className="otl-shell otl-compact-section-hero-inner">
            <div>
              <span className="otl-eyebrow">ENTERPRISE SOLUTIONS</span>
              <h1>Enterprise asset management and the services around it.</h1>
              <p>IT asset management is our specialty. We also support vendor transitions, enterprise print, contact center platforms, operational integrations, and related software.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact?topic=enterprise">
              Start a consultation <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="otl-shell otl-compact-services">
          <div className="otl-compact-services-heading">
            <strong>WHAT WE DELIVER</strong>
            <span>ITAM first, with complementary technology and operational services.</span>
          </div>

          <div className="otl-compact-service-list">
            {services.map(({ href, icon: Icon, title, detail }) => (
              <Link className="otl-compact-service-row otl-compact-service-row--link" href={href} key={title}>
                <Icon size={18} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{detail}</p>
                <ArrowRight className="otl-compact-service-arrow" size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="otl-compact-proof">
          <div className="otl-shell otl-compact-proof-inner">
            <strong>ENTERPRISE EXPERIENCE</strong>
            <div>
              {enterpriseExperience.map((company) => <span key={company}>{company}</span>)}
            </div>
            <Link href="/experience">View experience <ArrowRight size={13} /></Link>
          </div>
        </section>

        <section className="otl-compact-cta">
          <div className="otl-shell otl-compact-cta-inner">
            <div>
              <strong>Planning a technology change?</strong>
              <span>Tell us what is moving, replacing, breaking, or being built.</span>
            </div>
            <Link href="/contact?topic=enterprise">Talk to OneTime Labs <ArrowRight size={13} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
