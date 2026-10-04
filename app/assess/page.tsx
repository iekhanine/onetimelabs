import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./assessment.module.css";

export const metadata = {
  title: "Free Technology Assessments",
  description: "Free OneTime Labs vendor migration risk and IT asset management maturity assessments with immediate scoring and practical next steps.",
};

export default function AssessmentsPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.assessPage}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>ONETIME LABS ASSESS</span>
              <h1>Find the gaps before they become expensive.</h1>
              <p>Practical assessments built around operational readiness, control, and evidence. Get the score first. Contact information is only requested if you want OneTime Labs to help build the next-step plan.</p>
            </div>
            <aside className={styles.heroMeta}>
              <div><span>COST</span><strong>Free</strong></div>
              <div><span>LOGIN</span><strong>Not required</strong></div>
              <div><span>RESULT</span><strong>Immediate</strong></div>
              <div><span>FOLLOW-UP</span><strong>Optional</strong></div>
            </aside>
          </div>
        </section>

        <section className={styles.chooserGrid}>
          <article className={styles.chooserCard}>
            <small>VENDOR MIGRATION</small>
            <h2>Migration Risk Assessment</h2>
            <p>Evaluate scope, ownership, current-state discovery, dependencies, data, access, testing, rollback, and operational handoff.</p>
            <div className={styles.cardFacts}><span>25 questions</span><span>0–100 risk score</span><span>Critical risk flags</span></div>
            <Link className={styles.primaryLink} href="/assess/vendor-migration">Start assessment <ArrowRight size={14} /></Link>
          </article>

          <article className={styles.chooserCard}>
            <small>IT ASSET MANAGEMENT</small>
            <h2>ITAM Maturity Assessment</h2>
            <p>Evaluate governance, inventory quality, lifecycle controls, software and contracts, financial management, risk, and optimization.</p>
            <div className={styles.cardFacts}><span>25 questions</span><span>0–100 maturity score</span><span>Category priorities</span></div>
            <Link className={styles.primaryLink} href="/assess/itam">Start assessment <ArrowRight size={14} /></Link>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
