import type { CSSProperties } from "react";
import Link from "next/link";
import { ProductVideo } from "@/components/ProductVideo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products } from "@/lib/products";

const tvm = products.find((product) => product.slug === "tvm")!;
const otles = products.find((product) => product.slug === "otles")!;
const roffle = products.find((product) => product.slug === "roffle")!;
const tasks = products.find((product) => product.slug === "tasks")!;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="studio-intro" id="watch">
          <div className="shell studio-intro__inner">
            <span className="studio-intro__stamp">OneTime Labs / Product studio</span>
            <div>
              <h1>Less pitch.<br />More product.</h1>
              <p>
                These are the actual builds. No concept renders, no fake dashboards, no thirty-slide deck first.
              </p>
            </div>
            <a className="studio-intro__jump" href="#products">Start watching ↓</a>
          </div>
        </section>

        <section className="showcase showcase--tvm" id="products" style={{ "--accent": tvm.accent } as CSSProperties}>
          <div className="shell">
            <div className="showcase__heading">
              <div className="showcase__index">01</div>
              <div>
                <span className="eyebrow">{tvm.eyebrow}</span>
                <h2>{tvm.name}</h2>
              </div>
              <p>{tvm.summary}</p>
            </div>

            <ProductVideo
              src={tvm.showcaseVideo!}
              poster={tvm.screenshot}
              label="OneTime Menu / showcase"
              className="product-video--hero"
            />

            <div className="showcase__footer">
              <div className="showcase__line">Manage it in a browser. Put it on the screen.</div>
              <div className="showcase__actions">
                <Link className="button button--ink" href="/products/tvm">Explore OneTime Menu</Link>
                <a className="text-link" href={tvm.externalUrl} target="_blank" rel="noreferrer">Open product ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase showcase--otles" style={{ "--accent": otles.accent } as CSSProperties}>
          <div className="shell">
            <div className="showcase__heading showcase__heading--reverse">
              <div className="showcase__index">02</div>
              <div>
                <span className="eyebrow">{otles.eyebrow}</span>
                <h2>{otles.name}</h2>
              </div>
              <p>{otles.summary}</p>
            </div>

            <ProductVideo
              src={otles.showcaseVideo!}
              poster={otles.screenshot}
              label="OTLES / showcase"
            />

            <div className="showcase__footer">
              <div className="showcase__line">Documents that stay structured as the organization grows.</div>
              <div className="showcase__actions">
                <Link className="button button--ink" href="/products/otles">Explore OTLES</Link>
                <a className="text-link" href={otles.externalUrl} target="_blank" rel="noreferrer">Open product ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase showcase--roffle" style={{ "--accent": roffle.accent } as CSSProperties}>
          <div className="shell">
            <div className="showcase__heading">
              <div className="showcase__index">03</div>
              <div>
                <span className="eyebrow">{roffle.eyebrow}</span>
                <h2>{roffle.name}</h2>
              </div>
              <p>{roffle.summary}</p>
            </div>

            <ProductVideo
              src={roffle.showcaseVideo!}
              poster={roffle.screenshot}
              label="ROFFLE / showcase"
            />

            <div className="showcase__footer">
              <div className="showcase__line">Posts, video, blog, forums, discovery. A front page with some life in it.</div>
              <div className="showcase__actions">
                <Link className="button button--light" href="/products/roffle">Explore ROFFLE</Link>
                <a className="text-link text-link--light" href={roffle.externalUrl} target="_blank" rel="noreferrer">Open product ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section className="utility-section" id="tasks">
          <div className="shell utility-grid">
            <div className="utility-copy">
              <span className="eyebrow">Also shipping</span>
              <h2>{tasks.name}</h2>
              <p>{tasks.summary}</p>
              <div className="utility-proof">
                {tasks.proofPoints.map((point) => <span key={point}>{point}</span>)}
              </div>
              <div className="button-row">
                <Link className="button button--ink" href="/products/tasks">Explore Tasks</Link>
                <a className="text-link" href={tasks.externalUrl} target="_blank" rel="noreferrer">Open product ↗</a>
              </div>
            </div>
            <div className="utility-visual">
              <ProductVideo
                src="/videos/tasks-showcase.mp4"
                poster={tasks.screenshot}
                label="Tasks / showcase"
              />
            </div>
          </div>
        </section>

        <section className="notes-section">
          <div className="shell notes-grid">
            <div>
              <span className="eyebrow">How OneTime Labs works</span>
              <h2>Build the useful thing. Keep the weird parts.</h2>
            </div>
            <div className="notes-list">
              <article>
                <span>01</span>
                <strong>Real workflows first.</strong>
                <p>The product starts with something annoying, repetitive, expensive, or unnecessarily complicated.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Standard tech where it helps.</strong>
                <p>Browsers, portable data, straightforward deployment, and less dependence on proprietary boxes.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Ownership still matters.</strong>
                <p>Software should earn its place by being useful, not by making itself impossible to leave.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-riff">
          <div className="shell contact-riff__inner">
            <div>
              <span className="eyebrow eyebrow--light">Got a workflow you hate?</span>
              <h2>Good. That is usually where the interesting software starts.</h2>
            </div>
            <div className="contact-riff__actions">
              <Link className="button button--light" href="/contact?topic=custom">Tell us about it</Link>
              <Link className="text-link text-link--light" href="/contact">Contact OneTime Labs →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
