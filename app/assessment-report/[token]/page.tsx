import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";

import { getAssessmentServiceClient } from "@/lib/assessment-server";
import type { AssessmentReportSubmission } from "@/lib/assessment-pdf";
import styles from "./report.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Client Assessment Report | OneTime Labs",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ token: string }> };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export default async function AssessmentReportPage({ params }: Props) {
  const { token } = await params;
  if (!isUuid(token)) notFound();

  const db = getAssessmentServiceClient();
  if (!db) notFound();

  const { data, error } = await db
    .from("otl_assessment_submissions")
    .select("*")
    .eq("share_token", token)
    .eq("share_enabled", true)
    .maybeSingle();

  if (error || !data) notFound();
  const submission = data as AssessmentReportSubmission;
  const clientName = submission.contact_company || submission.contact_name || "Assessment client";
  const answers = submission.answers || [];
  const answerMap = new Map(answers.map((answer) => [answer.id, answer]));
  const notes = Object.entries(submission.consultation_notes || {}).filter(([, note]) => String(note || "").trim());

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Image src="/brand/otl-report-mark.png" alt="OneTime Labs" width={48} height={48} priority />
          <div>
            <strong>OneTime Labs</strong>
            <span>Client Assessment Report</span>
          </div>
        </div>
        <a className={styles.downloadButton} href={`/api/assessment-report/${token}/pdf`}>
          <Download size={16} /> Download PDF
        </a>
      </header>

      <article className={styles.report}>
        <section className={styles.intro}>
          <span>PREPARED FOR</span>
          <h1>{clientName}</h1>
          <p>{submission.assessment_title}</p>
          <small>Assessment completed {new Date(submission.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</small>
        </section>

        <section className={styles.scorePanel}>
          <div className={styles.scoreNumber}><strong>{submission.score}</strong><span>/100</span></div>
          <div><span>ASSESSMENT RESULT</span><h2>{submission.rating}</h2></div>
        </section>

        {submission.category_scores && Object.keys(submission.category_scores).length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Category breakdown</h2></div>
            <div className={styles.categoryList}>
              {Object.entries(submission.category_scores).map(([category, score]) => (
                <div className={styles.categoryRow} key={category}>
                  <div><strong>{category}</strong><span>{score}%</span></div>
                  <div className={styles.categoryTrack}><span style={{ width: `${Math.max(0, Math.min(100, Number(score) || 0))}%` }} /></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!submission.critical_flags?.length && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Critical risks</h2></div>
            <div className={styles.riskList}>
              {submission.critical_flags.map((flag, index) => (
                <article key={`${flag.title}-${index}`}>
                  <strong>{flag.title}</strong>
                  <p>{flag.recommendation}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {submission.consultation_summary && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Consultation summary</h2></div>
            <div className={styles.prose}>{submission.consultation_summary}</div>
          </section>
        )}

        {submission.implementation_plan_notes && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Implementation plan</h2></div>
            <div className={styles.prose}>{submission.implementation_plan_notes}</div>
          </section>
        )}

        {notes.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Consultation notes</h2></div>
            <div className={styles.notesList}>
              {notes.map(([questionId, note]) => {
                const answer = answerMap.get(questionId);
                return (
                  <article key={questionId}>
                    <span>{answer?.category || "Consultation"}</span>
                    <h3>{answer?.question || "Discussion note"}</h3>
                    {answer?.answerLabel && <small>Assessment response: {answer.answerLabel}</small>}
                    <p>{note}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {answers.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeading}><span /> <h2>Assessment responses</h2></div>
            <div className={styles.answerList}>
              {answers.map((answer) => (
                <article key={answer.id}>
                  <div><span>{answer.category}</span><strong>{answer.answerLabel}</strong></div>
                  <p>{answer.question}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className={styles.reportFooter}>
          <Image src="/brand/otl-report-mark.png" alt="" width={30} height={30} />
          <div><strong>OneTime Labs</strong><span>Practical technology systems, assessments, and implementation support.</span></div>
        </footer>
      </article>
    </main>
  );
}
