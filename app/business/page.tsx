import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Code2,
  FileSpreadsheet,
  Globe2,
  ListChecks,
  Repeat2,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Business Solutions",
  description:
    "Websites, booking, internal tools, job and customer tracking, reporting, automation, integrations, and custom software from OneTime Labs.",
};

const services = [
  {
    icon: Globe2,
    title: "Websites & Customer Services",
    detail: "Websites, booking, forms, quote requests, customer portals, and payments.",
  },
  {
    icon: ListChecks,
    title: "Job & Customer Tracking",
    detail: "Scheduling, work orders, customers, inventory, status tracking, and team workflows.",
  },
  {
    icon: FileSpreadsheet,
    title: "Spreadsheets & Reporting",
    detail: "Consolidate files, remove duplicate entry, automate calculations, and simplify reporting.",
  },
  {
    icon: Repeat2,
    title: "Workflow Automation",
    detail: "Connect repetitive steps across forms, email, spreadsheets, and the systems you already use.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Operations",
    detail: "Put sales, jobs, inventory, customer activity, and operating metrics in one clear view.",
  },
  {
    icon: Code2,
    title: "Custom Software & Integrations",
    detail: "Build the missing piece or connect the software you already depend on.",
  },
] as const;

export default function BusinessPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-section-page">
        <section className="otl-compact-section-hero">
          <div className="otl-shell otl-compact-section-hero-inner">
            <div>
              <span className="otl-eyebrow">BUSINESS SOLUTIONS</span>
              <h1>From the website customers see to the systems your team runs on.</h1>
              <p>Booking, job and customer tracking, reporting, automation, integrations, and custom software.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact?topic=business">
              Start a consultation <ArrowRight size={14} />
            </Link>
          </div>
        </section>


        <section className="otl-shell otl-compact-services">
          <div className="otl-compact-services-heading">
            <strong>WHAT WE BUILD</strong>
            <span>Practical systems for customers, staff, and day-to-day operations.</span>
          </div>

          <div className="otl-compact-service-list">
            {services.map(({ icon: Icon, title, detail }) => (
              <article className="otl-compact-service-row" key={title}>
                <Icon size={18} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="otl-compact-cta">
          <div className="otl-shell otl-compact-cta-inner">
            <div>
              <strong>Something in the business is harder than it should be?</strong>
              <span>Show us the process. We can simplify it, connect it, or build what is missing.</span>
            </div>
            <Link href="/contact?topic=business">Talk to OneTime Labs <ArrowRight size={13} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
