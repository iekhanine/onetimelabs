import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="otl-store-header otl-store-header--compact">
      <div className="otl-shell otl-compact-header">
        <Link className="otl-brand" href="/" aria-label="OneTime Labs home">
          <Image src="/brand/otl-mark.png" alt="" width={36} height={36} priority />
          <div>
            <strong>OneTime Labs</strong>
            <span>Business Technology & Software</span>
          </div>
        </Link>

        <nav className="otl-compact-nav" aria-label="Primary navigation">
          <Link href="/business">Business Solutions</Link>
          <Link href="/enterprise">Enterprise</Link>
          <Link href="/software">Software</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>

        <div className="otl-compact-header-actions">
          <Link href="/contact">Contact</Link>
          <a href="https://store.onetimelabs.net">Software Store</a>
        </div>
      </div>
    </header>
  );
}
