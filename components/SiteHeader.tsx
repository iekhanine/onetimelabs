import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="brand" href="/" aria-label="OneTime Labs home">
          <img src="/brand/otl-mark.png" alt="" className="brand__mark" />
          <span className="brand__name">OneTime Labs</span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/#watch">Watch</Link>
          <Link href="/#products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
