import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div className="site-footer__statement">
          <div className="footer-brand">
            <img src="/brand/otl-mark.png" alt="" />
            <strong>OneTime Labs</strong>
          </div>
          <p>Small studio. Real software. Built because the problem was worth fixing.</p>
        </div>

        <div className="site-footer__links">
          <Link href="/products/tvm">OneTime Menu</Link>
          <Link href="/products/otles">OTLES</Link>
          <Link href="/products/roffle">ROFFLE</Link>
          <Link href="/products/tasks">Tasks</Link>
        </div>

        <div className="site-footer__links">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Send an inquiry</Link>
        </div>
      </div>

      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} OneTime Labs</span>
        <span>Build once. Own forever.</span>
      </div>
    </footer>
  );
}
