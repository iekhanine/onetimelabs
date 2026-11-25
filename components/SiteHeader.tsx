import Image from "next/image";
import Link from "next/link";


export function SiteHeader() {
  return (
    <header className="otl-store-header otl-store-header--compact">
      <div className="otl-shell otl-compact-header">
        <Link className="otl-brand" href="/" aria-label="OneTime Labs home">
          <Image src="/brand/otl-mark.png" alt="" width={36} height={36} priority />
          <div><strong>OneTime Labs</strong><span>Enterprise Print Consulting</span></div>
        </Link>
        <nav className="otl-compact-nav" aria-label="Primary navigation"><Link href="/#managed-print">Managed Print</Link><Link href="/#vendor-migration">Vendor Migrations</Link><Link href="/#process">Our Process</Link></nav>
        <div className="otl-compact-header-actions">
          <Link href="/contact?topic=managed-print">Discuss a Project</Link>
        </div>
      </div>
    </header>
  );
}
