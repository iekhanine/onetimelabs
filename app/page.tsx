import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpenText,
  CheckSquare2,
  CircleDot,
  ClipboardCheck,
  Code2,
  ExternalLink,
  FileCode2,
  Map as MapIcon,
  MonitorPlay,
  PackageCheck,
  Radio,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type ProductStatus = "Live" | "In development";

type ProductCardProps = {
  name: string;
  category?: string;
  description: string;
  bullets: string[];
  href?: string;
  internalHref?: string;
  status?: ProductStatus;
  icon: ReactNode;
  compact?: boolean;
};

function ProductCard({
  name,
  category,
  description,
  bullets,
  href,
  internalHref,
  status = "Live",
  icon,
  compact = false,
}: ProductCardProps) {
  const link = href ?? internalHref;
  const isExternal = Boolean(href);

  return (
    <article className={`portfolio-card${compact ? " portfolio-card--compact" : ""}`}>
      <div className="portfolio-card__top">
        <div className="portfolio-card__icon" aria-hidden="true">
          {icon}
        </div>

        <div className="portfolio-card__labels">
          {category && <span className="portfolio-card__category">{category}</span>}
          <span
            className={`product-status ${
              status === "In development" ? "product-status--development" : ""
            }`}
          >
            <CircleDot size={9} />
            {status}
          </span>
        </div>
      </div>

      <h3>{name}</h3>
      <p>{description}</p>

      <div className="portfolio-card__features">
        {bullets.map((bullet) => (
          <span key={bullet}>{bullet}</span>
        ))}
      </div>

      {link && (
        <div className="portfolio-card__footer">
          {isExternal ? (
            <a href={link} target="_blank" rel="noreferrer">
              Open {name}
              <ExternalLink size={13} />
            </a>
          ) : (
            <Link href={link!}>
              Explore {name}
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="portfolio-home">
        {/* ==========================================================
            HOME 001 — INTRO
            ========================================================== */}
        <section className="portfolio-hero">
          <div className="shell portfolio-hero__grid">
            <div>
              <span className="portfolio-kicker">
                OneTime Labs / Engineering Portfolio
              </span>

              <h1>
                Software architecture &amp; engineering.
              </h1>

              <p>
                OneTime Labs designs and builds purpose-built operational software:
                documentation systems, geospatial platforms, licensing infrastructure,
                governance tools, and other applications built around real workflows.
              </p>

              <div className="portfolio-hero__actions">
                <a
                  className="portfolio-button portfolio-button--primary"
                  href="#enterprise"
                >
                  View selected work
                  <ArrowRight size={14} />
                </a>

                <Link
                  className="portfolio-button portfolio-button--secondary"
                  href="/custom-development"
                >
                  Custom engineering
                </Link>
              </div>
            </div>

            <div className="portfolio-hero__summary">
              <div className="portfolio-summary-row">
                <span>Flagship systems</span>
                <strong>5</strong>
              </div>

              <div className="portfolio-summary-row">
                <span>Primary disciplines</span>
                <strong>Architecture · Full stack · Data</strong>
              </div>

              <div className="portfolio-summary-row">
                <span>Delivery model</span>
                <strong>Purpose-built · Documented · Ownable</strong>
              </div>

              <div className="portfolio-summary-row">
                <span>Current portfolio</span>
                <strong>OTLES · PlotMap · Licensing · OTLAM · ChangeOps</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 010 — FLAGSHIP SYSTEMS
            ========================================================== */}
        <section className="portfolio-section" id="enterprise">
          <div className="shell" id="flagship">
            <div className="portfolio-section__heading">
              <div>
                <span className="portfolio-kicker">Flagship</span>
                <h2>Flagship systems</h2>
              </div>
              <p>
                The core OneTime Labs portfolio: documentation, geospatial records,
                licensing infrastructure, asset management, and operational governance.
              </p>
            </div>

            <div className="portfolio-grid portfolio-grid--featured">
              <ProductCard
                name="OTLES"
                category="Documentation & standards"
                description="Structured documentation and engineering standards for organizations that need more governance than a folder full of documents."
                bullets={[
                  "Organization-based documentation",
                  "Workspace / category / document hierarchy",
                  "Revision-ready content",
                  "Built around OTML",
                ]}
                href="https://otles.onetimelabs.net"
                icon={<BookOpenText size={20} />}
              />

              <ProductCard
                name="PlotMap"
                category="Memorial records & mapping"
                description="A complete memorial records and interactive grounds-mapping platform combining geospatial data, public search, field verification, and operational record management."
                bullets={[
                  "Interactive aerial mapping",
                  "Zones, plots & memorial records",
                  "Public family search",
                  "Mobile GPS field verification",
                ]}
                icon={<MapIcon size={20} />}
              />

              <ProductCard
                name="OneTime Labs Licensing"
                category="Software licensing"
                description="A shared licensing and activation platform for software products, customers, seats, activations, expiration, and license events."
                bullets={[
                  "License generation",
                  "Seat & activation tracking",
                  "Customer / product management",
                  "Shared platform integration",
                ]}
                href="https://licensing.onetimelabs.net"
                icon={<PackageCheck size={20} />}
              />

              <ProductCard
                name="OTLAM"
                category="Asset management"
                description="A modular asset-management platform designed for IT assets and expandable into equipment, vehicles, inventory, and other operational asset classes."
                bullets={[
                  "Asset registry",
                  "Assignments & lifecycle history",
                  "Import / discovery foundation",
                  "Modular asset model",
                ]}
                status="In development"
                icon={<Blocks size={20} />}
              />

              <ProductCard
                name="ChangeOps"
                category="Change management"
                description="Change request and CAB governance for organizations that need a real approval process without adopting an entire ITSM suite."
                bullets={[
                  "Change requests & implementation plans",
                  "CAB approval quorum & separation of duties",
                  "Audit history & CAB summaries",
                  "Multi-organization governance",
                ]}
                href="https://changeops.onetimelabs.net"
                icon={<ClipboardCheck size={20} />}
              />
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 020 — TOOLS
            ========================================================== */}
        <section className="portfolio-section portfolio-section--soft" id="venue">
          <div className="shell" id="tools">
            <div className="portfolio-section__heading">
              <div>
                <span className="portfolio-kicker">Tools</span>
                <h2>Operational tools</h2>
              </div>
              <p>
                Focused utilities and lightweight platforms built to solve a specific
                operational problem without unnecessary overhead.
              </p>
            </div>

            <div className="portfolio-grid portfolio-grid--three">
              <ProductCard
                name="PCCR"
                category="Print compliance"
                description="Printer Configuration Compliance Reporting turns fleet configuration exports into actionable compliance results."
                bullets={[
                  "Configuration compliance scoring",
                  "Passed / failed result logic",
                  "Fleet-level reporting",
                ]}
                href="https://pccr.onetimelabs.net"
                icon={<ShieldCheck size={20} />}
                compact
              />

              <ProductCard
                name="Tasks"
                category="Task management"
                description="A deliberately lightweight task manager for work that does not need a six-layer project-management ceremony."
                bullets={[
                  "Fast browser-based workflow",
                  "Simple task organization",
                  "Immediate use",
                ]}
                href="https://tasks.onetimelabs.net"
                icon={<CheckSquare2 size={20} />}
                compact
              />

              <ProductCard
                name="TVM"
                category="Venue tools"
                description="A browser-managed venue platform for digital displays and live trivia using standard TVs and customer devices."
                bullets={[
                  "Digital signage",
                  "Live venue trivia",
                  "Phone-based participation",
                ]}
                href="https://tvm.onetimelabs.net"
                icon={<MonitorPlay size={20} />}
                compact
              />
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 030 — ENTERTAINMENT PLATFORMS
            ========================================================== */}
        <section className="portfolio-section" id="entertainment">
          <div className="shell">
            <div className="portfolio-section__heading">
              <div>
                <span className="portfolio-kicker">Entertainment platforms built by OneTime Labs</span>
                <h2>Entertainment platforms</h2>
              </div>
              <p>
                Publishing, community, creator, and live-audience platforms built by OneTime Labs.
              </p>
            </div>

            <div className="portfolio-grid portfolio-grid--three">
              <ProductCard
                name="ROFFLE"
                category="Community publishing"
                description="A modern curated-content platform built around internet discovery, posts, video, publishing, and community."
                bullets={[
                  "Curated front page",
                  "Video & mixed-media posts",
                  "Multi-user publishing",
                ]}
                href="https://roffle.com"
                icon={<Sparkles size={20} />}
                compact
              />

              <ProductCard
                name="IvanSays.com"
                category="Live audience interaction"
                description="A live audience-submission platform built for streaming, moderation, and getting viewer messages onto the screen."
                bullets={[
                  "Audience submissions",
                  "Moderator workflow",
                  "OBS / stream display",
                ]}
                href="https://ivansays.com"
                icon={<Radio size={20} />}
                compact
              />

              <ProductCard
                name="UnfilteredLog.com"
                category="Experimental publishing"
                description="A visual-first publishing platform for posts, images, and personal internet logging without forcing everything into the same social-feed template."
                bullets={[
                  "Visual publishing",
                  "Multi-image posts",
                  "Independent web identity",
                ]}
                href="https://unfilteredlog.com"
                icon={<FileCode2 size={20} />}
                compact
              />
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 040 — PLATFORM TECHNOLOGY
            ========================================================== */}
        <section className="portfolio-section portfolio-section--dark" id="technology">
          <div className="shell platform-tech-grid">
            <div>
              <span className="portfolio-kicker portfolio-kicker--light">Platform technology</span>
              <h2>OTML</h2>
              <p>
                OneTime Labs Markup Language is the structured markup layer behind the OTLES
                documentation ecosystem. It provides purpose-built document blocks for
                engineering and operational content.
              </p>
            </div>

            <div className="otml-example" aria-label="OTML example">
              <div className="otml-example__bar">
                <Code2 size={14} />
                Structured document markup
              </div>
              <pre>{`{section}
{title}Deployment Standard{/title}

{warning}
Production changes require CAB approval.
{/warning}

{code}
npm run build
{/code}
{/section}`}</pre>
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 050 — PROJECT WORK
            ========================================================== */}
        <section className="portfolio-section" id="projects">
          <div className="shell">
            <div className="portfolio-section__heading">
              <div>
                <span className="portfolio-kicker">Projects built by OneTime Labs</span>
                <h2>Projects</h2>
              </div>
              <p>
                Third-party software projects engineered by OneTime Labs.
              </p>
            </div>

            <div className="project-feature">
              <div className="project-feature__icon">
                <Wrench size={21} />
              </div>
              <div className="project-feature__copy">
                <div className="project-feature__meta">
                  <span>Third-party project</span>
                  <span className="product-status product-status--development">
                    <CircleDot size={9} />
                    In development
                  </span>
                </div>
                <h3>D3Connect</h3>
                <p>
                  An active third-party software project being designed and engineered by
                  OneTime Labs. D3Connect is a OneTime Labs project, not a OneTime Labs-owned
                  product.
                </p>
              </div>
              <a
                className="portfolio-button portfolio-button--secondary"
                href="https://d3connect.onetimelabs.net"
                target="_blank"
                rel="noreferrer"
              >
                View project
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 060 — OPERATING PHILOSOPHY
            ========================================================== */}
        <section className="ownership-section">
          <div className="shell ownership-grid">
            <div>
              <span className="portfolio-kicker portfolio-kicker--light">How we build</span>
              <h2>How OneTime Labs works</h2>
            </div>

            <div>
              <p>
                We design, build, deploy, document, and hand over software. When an existing product is the better fit, we can implement that instead of forcing a custom build.
              </p>

              <div className="ownership-points">
                <span>Purpose-built software</span>
                <span>Vendor-neutral engineering</span>
                <span>Source-code handoff</span>
                <span>Documented deployment</span>
                <span>No mandatory perpetual subscription</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            HOME 070 — CONTACT
            ========================================================== */}
        <section className="portfolio-contact">
          <div className="shell portfolio-contact__inner">
            <div>
              <span className="portfolio-kicker">OneTime Labs</span>
              <h2>Custom development</h2>
              <p>
                Internal tools, operational platforms, integrations, and purpose-built applications.
              </p>
            </div>

            <Link className="portfolio-button portfolio-button--primary" href="/contact?topic=custom">
              Talk to OneTime Labs
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
