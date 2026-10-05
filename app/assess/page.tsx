import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { assessmentGroups, assessments } from "@/lib/assessments";
import AssessmentLibraryClient from "./AssessmentLibraryClient";
import styles from "./assessment.module.css";

export const metadata = {
  title: "Free Technology Assessment Library",
  description: "Free OneTime Labs assessments for IT operations, security, asset management, cloud, vendor management, service delivery, AI readiness, and technology governance.",
};

export default function AssessmentsPage() {
  const cards = Object.values(assessments)
    .map((definition) => ({
      type: definition.type,
      title: definition.title,
      shortTitle: definition.shortTitle,
      group: definition.group || "Strategy & Delivery",
      intro: definition.intro,
      scoreLabel: definition.scoreLabel,
      questionCount: definition.questions.length,
      estimatedMinutes: definition.estimatedMinutes || "About 5 minutes",
    }))
    .sort((a, b) => a.group.localeCompare(b.group) || a.shortTitle.localeCompare(b.shortTitle));

  return (
    <>
      <SiteHeader />
      <main className={styles.assessPage}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>ONETIME LABS ASSESSMENT LIBRARY</span>
              <h1>Find the gaps before they become expensive.</h1>
              <p>
                A growing library of practical technology assessments built around ownership, evidence, operational readiness, cost, and risk. Get your score immediately. No login and no contact information required.
              </p>
            </div>
            <aside className={styles.heroMeta}>
              <div><span>ASSESSMENTS</span><strong>{cards.length} available</strong></div>
              <div><span>COST</span><strong>Free</strong></div>
              <div><span>LOGIN</span><strong>Not required</strong></div>
              <div><span>RESULT</span><strong>Immediate score + priorities</strong></div>
            </aside>
          </div>
        </section>

        <AssessmentLibraryClient cards={cards} groups={[...assessmentGroups]} />
      </main>
      <SiteFooter />
    </>
  );
}
