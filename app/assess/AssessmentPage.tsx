import { AssessmentDefinition } from "@/lib/assessments";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AssessmentClient from "./AssessmentClient";
import styles from "./assessment.module.css";

export default function AssessmentPage({ definition }: { definition: AssessmentDefinition }) {
  return (
    <>
      <SiteHeader />
      <main className={styles.assessPage}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>{definition.eyebrow}</span>
              <h1>{definition.title}</h1>
              <p>{definition.intro}</p>
            </div>
            <aside className={styles.heroMeta}>
              <div><span>QUESTIONS</span><strong>{definition.questions.length}</strong></div>
              <div><span>TIME</span><strong>{definition.estimatedMinutes || "About 5 minutes"}</strong></div>
              <div><span>RESULT</span><strong>Immediate score + priorities</strong></div>
              <div><span>CONTACT INFO</span><strong>Optional after your score</strong></div>
            </aside>
          </div>
        </section>
        <div className={styles.assessShell}>
          <AssessmentClient definition={definition} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
