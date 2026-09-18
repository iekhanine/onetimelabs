import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="otl-store-header">
      <div className="otl-header-main">
        <div className="otl-shell otl-header-main-inner">
          <Link className="otl-brand" href="/" aria-label="OneTime Labs home">
            <Image src="/brand/otl-mark.png" alt="" width={36} height={36} />
            <div>
              <strong>OneTime Labs</strong>
              <span>Enterprise Consulting</span>
            </div>
          </Link>

          <div className="otl-header-context" aria-label="Service area">
            <span>Milwaukee</span><i aria-hidden="true" />
            <span>Racine</span><i aria-hidden="true" />
            <span>Chicago</span>
          </div>
        </div>
      </div>

      <nav className="otl-department-nav" aria-label="Primary navigation">
        <div className="otl-shell otl-department-inner">
          <Link href="/">Home</Link>

          <div className="otl-nav-item">
            <Link href="/consulting">Services</Link>
            <div className="otl-nav-dropdown" aria-label="Services navigation">
              <Link href="/vendor-migration">
                <strong>Vendor Migration</strong>
                <span>Plan and execute technology provider changes</span>
              </Link>
              <Link href="/managed-print-services">
                <strong>Managed Print Services</strong>
                <span>Printer fleets, servers, tools, and provider transitions</span>
              </Link>
              <Link href="/consulting">
                <strong>Enterprise IT Consulting</strong>
                <span>Architecture, assets, licenses, ServiceNow, and governance</span>
              </Link>
              <Link href="/custom-development">
                <strong>Custom Development</strong>
                <span>Internal tools, workflows, dashboards, and integrations</span>
              </Link>
            </div>
          </div>

          <div className="otl-nav-item">
            <Link href="/software">Software</Link>
            <div className="otl-nav-dropdown otl-nav-dropdown-small" aria-label="Software navigation">
              <Link href="/software">
                <strong>Enterprise Software</strong>
                <span>OTLES, ChangeOps, PCCR, Licensing, OTLAM</span>
              </Link>
              <Link href="/creator-tools">
                <strong>Creator Tools</strong>
                <span>Twitch, YouTube, OBS, and broadcast utilities</span>
              </Link>
            </div>
          </div>

          <Link href="/experience">Experience</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
