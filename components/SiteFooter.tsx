import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="otl-footer">
      <div className="otl-shell otl-footer-grid">
        <div className="otl-footer-brand">
          <Image src="/brand/otl-mark.png" alt="" width={36} height={36} />
          <div>
            <strong>OneTime Labs</strong>
            <span>Vendor migration, Managed Print Services, enterprise IT consulting, and custom software.</span>
          </div>
        </div>

        <div className="otl-footer-links">
          <Link href="/consulting">Services</Link>
          <Link href="/software">Software</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contribute">Support OTL</Link>
          <Link href="/invest">Investor Info</Link>
        </div>

        <div className="otl-footer-copy">
          <span>Racine, WI · Milwaukee, WI · Chicago, IL</span>
          <span>Remote & national engagements available</span>
          <span>© {new Date().getFullYear()} OneTime Labs</span>
        </div>
      </div>
    </footer>
  );
}
