import Image from "next/image";
import Link from "next/link";
import {siteCopy} from "@/lib/itam-site-copy";

export function SiteHeader() {
  return (
    <header className="otl-store-header otl-store-header--compact">
      <div className="otl-shell otl-compact-header">
        <Link className="otl-brand" href="/" aria-label="OneTime Labs home">
          <Image src="/brand/otl-mark.png" alt="" width={36} height={36} priority />
          <div><strong>OneTime Labs</strong><span>{siteCopy.specialty}</span></div>
        </Link>
        <nav className="otl-compact-nav" aria-label="Primary navigation">
          <Link href="/services/itam">ITAM Services</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/business">Other Solutions</Link>
          <Link href="/itam">ITAM Toolkit</Link>
        </nav>
        <div className="otl-compact-header-actions">
          <Link href="/contact?topic=itam">Discuss a Project</Link>
        </div>
      </div>
    </header>
  );
}
