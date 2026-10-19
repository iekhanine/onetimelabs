import Image from "next/image";
import Link from "next/link";
import {siteCopy} from "@/lib/itam-site-copy";
export function SiteFooter() {
  return <footer className="otl-footer otl-footer--compact"><div className="otl-shell otl-compact-footer">
    <div className="otl-footer-brand"><Image src="/brand/otl-mark.png" alt="" width={32} height={32}/><div><strong>OneTime Labs</strong><span>{siteCopy.specialty}</span></div></div>
    <div className="otl-compact-footer-links"><Link href="/services/itam">ITAM Services</Link><Link href="/business">Other Services</Link><Link href="/experience">Experience</Link><Link href="/software">Software</Link><Link href="/contact">Contact</Link></div>
    <span className="otl-compact-footer-copy">© {new Date().getFullYear()} OneTime Labs</span>
  </div></footer>;
}
