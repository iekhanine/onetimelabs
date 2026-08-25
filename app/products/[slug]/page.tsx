import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductVideo } from "@/components/ProductVideo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main style={{ "--accent": product.accent } as CSSProperties}>
        <section className="product-intro">
          <div className="shell">
            <Link className="back-link" href="/#products">← Back to OneTime Labs</Link>
            <div className="product-intro__grid">
              <div>
                <span className="eyebrow">{product.eyebrow}</span>
                <h1>{product.name}</h1>
              </div>
              <div className="product-intro__copy">
                <p className="product-intro__summary">{product.summary}</p>
                <p>{product.description}</p>
                <div className="button-row">
                  <a className="button button--ink" href={product.externalUrl} target="_blank" rel="noreferrer">Open {product.name} ↗</a>
                  <Link className="text-link" href={`/contact?topic=product&product=${product.slug}`}>Ask about it →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-showreel">
          <div className="shell">
            {product.showcaseVideo ? (
              <ProductVideo
                src={product.showcaseVideo}
                poster={product.screenshot}
                label={`${product.name} / product showcase`}
                className="product-video--detail"
              />
            ) : (
              <div className="product-still">
                <img src={product.screenshot} alt={product.screenshotAlt} />
              </div>
            )}
          </div>
        </section>

        <section className="product-facts">
          <div className="shell product-facts__grid">
            <div>
              <span className="eyebrow">What it does</span>
              <h2>Focused on the job it was built to do.</h2>
              <div className="audience-note">
                <span>Built for</span>
                <strong>{product.audience}</strong>
              </div>
            </div>
            <div className="feature-list">
              {product.features.map((feature, index) => (
                <div key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{feature}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {product.adminVideo && (
          <section className="admin-story">
            <div className="shell">
              <div className="admin-story__heading">
                <div>
                  <span className="eyebrow eyebrow--light">Behind the screen</span>
                  <h2>{product.adminHeading}</h2>
                </div>
                <p>{product.adminDescription}</p>
              </div>
              <ProductVideo
                src={product.adminVideo}
                poster={product.screenshot}
                label={`${product.name} / administration`}
                className="product-video--dark"
              />
            </div>
          </section>
        )}

        <section className="proof-strip">
          <div className="shell proof-strip__inner">
            {product.proofPoints.map((point) => <span key={point}>{point}</span>)}
          </div>
        </section>

        <section className="product-close">
          <div className="shell product-close__inner">
            <div>
              <span className="eyebrow">{product.name}</span>
              <h2>See the real thing.</h2>
            </div>
            <div className="button-row">
              <a className="button button--ink" href={product.externalUrl} target="_blank" rel="noreferrer">Open product ↗</a>
              <Link className="text-link" href={`/contact?topic=product&product=${product.slug}`}>Ask OneTime Labs →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
