import type { Metadata } from "next";
import ContributeClient from "./ContributeClient";
import styles from "./contribute.module.css";

export const metadata: Metadata = {
  title: "Support OneTime Labs",
  description:
    "Support independent software engineering at OneTime Labs or register interest in a possible future investment opportunity.",
};

export default function ContributePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/" aria-label="OneTime Labs home">
            <span className={styles.brandMark}>OTL</span>
            <span className={styles.brandName}>OneTime Labs</span>
          </a>
          <a className={styles.backLink} href="/">
            Back to site
          </a>
        </header>

        <ContributeClient />

        <footer className={styles.footer}>
          <span>OneTime Labs</span>
          <span>Software built to be yours.</span>
        </footer>
      </div>
    </main>
  );
}
