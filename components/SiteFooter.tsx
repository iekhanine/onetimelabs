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
            <span>Vendor migration, managed print, enterprise consulting, and purpose-built software.</span>
          </div>
        </div>

        <div className="otl-footer-links">
          <Link href="/vendor-migration">Vendor Migration</Link>
          <Link href="/managed-print-services">Managed Print</Link>
          <Link href="/consulting">Consulting</Link>
          <Link href="/custom-development">Development</Link>
          <Link href="/software">Software</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="otl-footer-copy">
          <span>Racine, WI · Milwaukee, WI · Chicago, IL</span>
          <span>© {new Date().getFullYear()} OneTime Labs</span>
        </div>
      </div>
    </footer>
  );
}
