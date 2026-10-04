"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Send } from "lucide-react";

import {
  AssessmentDefinition,
  AssessmentResult,
  calculateAssessment,
} from "@/lib/assessments";

import styles from "./assessment.module.css";

export default function AssessmentClient({ definition }: { definition: AssessmentDefinition }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [editToken, setEditToken] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveWarning, setSaveWarning] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState("");

  const question = definition.questions[current];
  const selected = question ? answers[question.id] : undefined;
  const progress = result ? 100 : Math.round(((current + 1) / definition.questions.length) * 100);

  const categoryDisplay = useMemo(() => {
    if (!result) return [];
    return Object.entries(result.categoryScores);
  }, [result]);

  function choose(value: string) {
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
  }

  async function finishAssessment() {
    const calculated = calculateAssessment(definition.type, answers);
    setResult(calculated);
    setSaving(true);
    setSaveWarning("");

    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: definition.type, answers }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to save assessment.");
      setSubmissionId(payload.id);
      setEditToken(payload.editToken);
    } catch (error) {
      setSaveWarning(
        error instanceof Error
          ? `Your score is still valid, but the assessment could not be saved: ${error.message}`
          : "Your score is still valid, but the assessment could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  function goNext() {
    if (!selected) return;
    if (current === definition.questions.length - 1) {
      void finishAssessment();
      return;
    }
    setCurrent((value) => value + 1);
  }

  function restart() {
    setCurrent(0);
    setAnswers({});
    setResult(null);
    setSubmissionId(null);
    setEditToken(null);
    setSaveWarning("");
    setContactSent(false);
    setContactError("");
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submissionId || !editToken) {
      setContactError("The assessment needs to be saved before we can attach your consultation request. Please retry the assessment.");
      return;
    }

    const form = event.currentTarget;
    const contact = Object.fromEntries(new FormData(form).entries());
    setContactSubmitting(true);
    setContactError("");

    try {
      const response = await fetch("/api/assessments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submissionId, editToken, contact }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to send consultation request.");
      setContactSent(true);
      form.reset();
    } catch (error) {
      setContactError(error instanceof Error ? error.message : "Unable to send consultation request.");
    } finally {
      setContactSubmitting(false);
    }
  }

  if (result) {
    const categoryLabel = definition.scoringDirection === "risk" ? "risk" : "maturity";
    return (
      <>
        <section className={styles.resultsCard}>
          <div className={styles.scoreHeader}>
            <div className={styles.scoreRing} aria-label={`${definition.scoreLabel}: ${result.score} out of 100`}>
              <strong>{result.score}</strong>
              <span>/ 100</span>
            </div>
            <div className={styles.scoreCopy}>
              <small>{definition.scoreLabel.toUpperCase()}</small>
              <h2>{result.rating}</h2>
              <p>{result.ratingDescription}</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Category breakdown</h3>
          <div className={styles.categoryList}>
            {categoryDisplay.map(([category, score]) => (
              <div className={styles.categoryRow} key={category}>
                <span>{category}</span>
                <div className={styles.categoryTrack} aria-hidden="true">
                  <div className={styles.categoryFill} style={{ width: `${score}%` }} />
                </div>
                <strong>{score}%</strong>
              </div>
            ))}
          </div>
          <p className={styles.privacyNote}>
            Category percentages represent {categoryLabel}. {definition.scoringDirection === "risk" ? "Higher is riskier." : "Higher is more mature."}
          </p>

          {result.criticalFlags.length > 0 && (
            <div className={styles.flagBox}>
              <div className={styles.flagHeading}>
                <AlertTriangle size={18} />
                {result.criticalFlags.length} critical {result.criticalFlags.length === 1 ? "risk" : "risks"} identified
              </div>
              <div className={styles.flagList}>
                {result.criticalFlags.map((flag) => (
                  <article key={flag.questionId}>
                    <strong>{flag.title}</strong>
                    <p>{flag.recommendation}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          <h3 className={styles.sectionTitle}>Priority actions</h3>
          <div className={styles.recommendations}>
            {result.topRecommendations.map((recommendation, index) => (
              <article className={styles.recommendation} key={recommendation.category}>
                <strong>{index + 1}. {recommendation.category}</strong>
                <p>{recommendation.text}</p>
              </article>
            ))}
          </div>

          {saveWarning && <p className={styles.formError}>{saveWarning}</p>}
          {saving && <p className={styles.privacyNote}>Saving your assessment…</p>}

          <div className={styles.resultActions}>
            <button className={styles.secondaryButton} type="button" onClick={restart}>
              <RotateCcw size={14} /> Retake assessment
            </button>
            <Link className={styles.secondaryButton} href="/assess">
              View other assessments
            </Link>
          </div>
        </section>

        <section className={styles.contactCard} id="consultation">
          <h2>Want a free consultation and implementation plan?</h2>
          <p>
            Your score is already yours. Contact information is optional. If you want help, send your details and OneTime Labs will review this assessment before the conversation.
          </p>

          {contactSent ? (
            <div className={styles.successBox} role="status">
              <CheckCircle2 size={22} />
              <div>
                <strong>Consultation request received.</strong>
                <p>Your assessment and contact information are now linked for review. OneTime Labs will follow up using the email you provided.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submitContact}>
              <div className={styles.contactGrid}>
                <label>
                  NAME *
                  <input name="name" required autoComplete="name" maxLength={120} />
                </label>
                <label>
                  EMAIL *
                  <input name="email" type="email" required autoComplete="email" maxLength={254} />
                </label>
                <label>
                  COMPANY
                  <input name="company" autoComplete="organization" maxLength={160} />
                </label>
                <label>
                  PHONE
                  <input name="phone" type="tel" autoComplete="tel" maxLength={50} />
                </label>
                <label className={styles.fullField}>
                  WHAT WOULD YOU LIKE HELP WITH?
                  <textarea name="notes" rows={4} maxLength={3000} placeholder="Migration timeline, current vendor, ITAM cleanup, audit readiness, tooling, implementation, or anything else we should know." />
                </label>
              </div>
              {contactError && <p className={styles.formError}>{contactError}</p>}
              <div className={styles.resultActions}>
                <button className={styles.primaryButton} type="submit" disabled={contactSubmitting || !submissionId || !editToken}>
                  <Send size={14} /> {contactSubmitting ? "SENDING…" : "REQUEST FREE CONSULTATION"}
                </button>
              </div>
              <p className={styles.privacyNote}>No login required. Your contact information is used to respond to this request and review the assessment you just completed.</p>
            </form>
          )}
        </section>
      </>
    );
  }

  return (
    <section className={styles.assessmentCard}>
      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.questionWrap}>
        <div className={styles.questionMeta}>
          <strong>{question.category}</strong>
          <span>QUESTION {current + 1} OF {definition.questions.length}</span>
        </div>
        <h2>{question.text}</h2>
        <div className={styles.optionGrid}>
          {definition.options.map((option) => {
            const active = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.optionButton} ${active ? styles.optionSelected : ""}`}
                onClick={() => choose(option.value)}
                aria-pressed={active}
              >
                <span>{option.label}</span>
                {active && <Check className={styles.optionIcon} size={18} />}
              </button>
            );
          })}
        </div>
        <div className={styles.navRow}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
            disabled={current === 0}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button type="button" className={styles.primaryButton} disabled={!selected} onClick={goNext}>
            {current === definition.questions.length - 1 ? "GET MY SCORE" : "NEXT"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
