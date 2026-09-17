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
            <span>Racine</span><i aria-hidden="true" />
            <span>Milwaukee</span><i aria-hidden="true" />
            <span>Chicago</span><i aria-hidden="true" />
            <span>Remote / National</span>
          </div>

          <div className="otl-header-actions">
            <Link href="/contact">Contact</Link>
            <a className="otl-header-store-link" href="https://store.onetimelabs.net">
              Software Store
            </a>
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
                <span>Discovery, transition, cutover, validation</span>
              </Link>
              <Link href="/managed-print-services">
                <strong>Managed Print Services</strong>
                <span>Fleet, tooling, MPS transition, print architecture</span>
              </Link>
              <Link href="/consulting">
                <strong>Enterprise Consulting</strong>
                <span>Architecture, ITAM/SAM, CMDB, operations</span>
              </Link>
              <Link href="/custom-development">
                <strong>Custom Development</strong>
                <span>Internal tools and operational software</span>
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
                <span>Twitch, YouTube, OBS, broadcast utilities</span>
              </Link>
            </div>
          </div>

          <Link href="/experience">Experience</Link>
          <Link href="/pricing">Pricing</Link>
          <a href="https://store.onetimelabs.net">Store</a>
        </div>
      </nav>
    </header>
  );
}
