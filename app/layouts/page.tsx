import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Layers3 } from "lucide-react";

import { demoSites } from "@/lib/business-site/demos";
import "./gallery.css";

export const metadata = {
  title: "Business Site Layout Gallery | OneTime Labs",
  description: "Preview complete OneTime Labs business website designs before choosing a customer layout.",
  robots: { index: false, follow: false },
};

const activeLayouts = new Set([
  "clean-service",
  "workshop-dark",
  "editorial-studio",
]);

export default function LayoutGalleryPage() {
  return (
    <main className="layout-gallery-page">
      <header className="layout-gallery-header">
        <Link href="/" className="layout-gallery-brand"><Layers3 size={22} /> OneTime Labs</Link>
        <div>
          <span>Business Site Design Library</span>
          <h1>Choose the site, not just a color.</h1></div>
      </header>

      <section className="layout-gallery-grid">
        {demoSites.map(site => {
          const palette = site.layout.config?.palette ?? {};
          const hero = site.media.find(item => item.kind === "hero");
          const isActive = activeLayouts.has(site.layout.code);

          const previewImage =
            site.layout.code === "editorial-studio"
              ? "https://images.pexels.com/photos/7755166/pexels-photo-7755166.jpeg?cs=srgb&dl=pexels-rdne-7755166.jpg&fm=jpg"
              : hero?.public_url;

          return (
            <article
              key={site.layout.code}
              className={`layout-gallery-card ${isActive ? "" : "layout-gallery-card-disabled"}`}
              aria-disabled={!isActive}
            >
              {isActive ? (
                <Link className="layout-gallery-shot" href={`/layouts/${site.layout.code}`}>
                  {previewImage && <Image src={previewImage} alt={`${site.layout.name} preview`} fill sizes="(max-width: 850px) 100vw, 50vw" />}
                  <div className="layout-gallery-shot-overlay"><Eye size={18} /> Open full demo</div>
                </Link>
              ) : (
                <div className="layout-gallery-shot layout-gallery-shot-disabled">
                  {previewImage && <Image src={previewImage} alt={`${site.layout.name} preview`} fill sizes="(max-width: 850px) 100vw, 50vw" />}
                  <div className="layout-gallery-disabled-overlay">Coming soon</div>
                </div>
              )}

              <div className="layout-gallery-card-copy">
                <div className="layout-gallery-card-title">
                  <div>
                    <span>{site.instance.business_type.replaceAll("_", " ")}</span>
                    <h2>{site.layout.name}</h2>
                  </div>
                  <div className="layout-gallery-swatches">
                    {[palette.background, palette.surface, palette.accent, palette.accent2].filter(Boolean).map((color: string) => <i key={color} style={{ background: color }} />)}
                  </div>
                </div>
                <p>{site.content.subheadline}</p>
                <div className="layout-gallery-business">Demo business: <strong>{site.instance.business_name}</strong></div>

                {isActive ? (
                  <Link className="layout-gallery-open" href={`/layouts/${site.layout.code}`}>
                    View complete site <ArrowRight size={15} />
                  </Link>
                ) : (
                  <div className="layout-gallery-open layout-gallery-open-disabled">Not available yet</div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="layout-gallery-footer">These are presentation demos only. Customer branding, photography, services and content are replaced from the business admin after launch.</footer>
    </main>
  );
}
