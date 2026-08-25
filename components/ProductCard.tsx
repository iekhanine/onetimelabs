import type { CSSProperties } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card" style={{ "--product-accent": product.accent } as CSSProperties}>
      <div className="product-card__top">
        <div>
          <span className="eyebrow">{product.eyebrow}</span>
          <h3>{product.name}</h3>
        </div>
        {product.flagship && <span className="flagship-badge">Flagship</span>}
      </div>

      <p>{product.summary}</p>

      <div className="product-card__proof">
        {product.proofPoints.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>

      <div className="product-card__actions">
        <Link className="text-link" href={`/products/${product.slug}`}>
          Explore product <span aria-hidden="true">→</span>
        </Link>
        <a className="text-link text-link--muted" href={product.externalUrl} target="_blank" rel="noreferrer">
          Visit site ↗
        </a>
      </div>
    </article>
  );
}
