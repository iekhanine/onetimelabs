import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="otl-footer otl-footer--compact">
      <div className="otl-shell otl-compact-footer">
        <div className="otl-footer-brand">
          <Image src="/brand/otl-mark.png" alt="" width={32} height={32} />
          <div>
            <strong>OneTime Labs</strong>
            <span>Business Solutions · Enterprise · Software</span>
          </div>
        </div>

        <div className="otl-compact-footer-links">
          <Link href="/business">Business Solutions</Link>
          <Link href="/enterprise">Enterprise</Link>
          <Link href="/software">Software</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <span className="otl-compact-footer-copy">© {new Date().getFullYear()} OneTime Labs</span>
      </div>
    </footer>
  );
}
