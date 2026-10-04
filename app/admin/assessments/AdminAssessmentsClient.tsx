"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, FlaskConical, LogIn, RefreshCw, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { generateConsultationGuide } from "@/lib/consulting-guides";
import type { AssessmentType } from "@/lib/assessments";
import styles from "./admin.module.css";

type AssessmentAnswer = { id: string; category: string; question: string; answer: string; answerLabel: string };

type Submission = {
  id: string;
  assessment_type: AssessmentType;
  assessment_title: string;
  score: number;
  rating: string;
  category_scores: Record<string, number> | null;
  critical_flags: Array<{ title: string; recommendation: string }> | null;
  answers: AssessmentAnswer[] | null;
  contact_requested: boolean;
  contact_name: string | null;
  contact_email: string | null;
  contact_company: string | null;
  contact_phone: string | null;
  contact_notes: string | null;
  consultation_status: string;
  consultation_notes: Record<string, string> | null;
  consultation_summary: string | null;
  implementation_plan_notes: string | null;
  is_test: boolean | null;
  created_at: string;
};

type WorkspaceDraft = {
  notes: Record<string, string>;
  summary: string;
  implementationPlan: string;
};

function workspaceFromSubmission(item: Submission): WorkspaceDraft {
  return {
    notes: item.consultation_notes || {},
    summary: item.consultation_summary || "",
    implementationPlan: item.implementation_plan_notes || "",
  };
}

export default function AdminAssessmentsClient() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "leads" | "assessments">("leads");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [workspaceDrafts, setWorkspaceDrafts] = useState<Record<string, WorkspaceDraft>>({});
  const [saveState, setSaveState] = useState<Record<string, string>>({});
  const [creatingTest, setCreatingTest] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  async function load() {
    setLoading(true);
    setError("");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setSignedIn(false);
      setLoading(false);
      return;
    }
    setSignedIn(true);
    setUserEmail(session.user.email || "");

    const response = await fetch("/api/assessments", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Unable to load assessments.");
      setLoading(false);
      return;
    }
    const items = (payload.submissions || []) as Submission[];
    setSubmissions(items);
    setWorkspaceDrafts(Object.fromEntries(items.map((item) => [item.id, workspaceFromSubmission(item)])));
    setLoading(false);
  }

  useEffect(() => {
    void load();
    const { data } = supabase.auth.onAuthStateChange(() => void load());
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/admin/assessments` },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function authorizedFetch(url: string, init: RequestInit = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Admin session expired.");
    return fetch(url, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  }

  async function updateStatus(id: string, status: string) {
    const response = await authorizedFetch("/api/assessments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      setSubmissions((items) => items.map((item) => item.id === id ? { ...item, consultation_status: status } : item));
    }
  }

  async function createTestAssessment() {
    setCreatingTest(true);
    setError("");
    try {
      const response = await authorizedFetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminAction: "create-test" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to create test assessment.");
      await load();
      setFilter("leads");
      setExpanded(payload.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create test assessment.");
    } finally {
      setCreatingTest(false);
    }
  }

  function updateQuestionNote(id: string, questionId: string, value: string) {
    setWorkspaceDrafts((current) => {
      const previous = current[id] || { notes: {}, summary: "", implementationPlan: "" };
      return {
        ...current,
        [id]: { ...previous, notes: { ...previous.notes, [questionId]: value } },
      };
    });
    setSaveState((current) => ({ ...current, [id]: "Unsaved changes" }));
  }

  function updateWorkspaceField(id: string, field: "summary" | "implementationPlan", value: string) {
    setWorkspaceDrafts((current) => {
      const previous = current[id] || { notes: {}, summary: "", implementationPlan: "" };
      return { ...current, [id]: { ...previous, [field]: value } };
    });
    setSaveState((current) => ({ ...current, [id]: "Unsaved changes" }));
  }

  async function saveWorkspace(id: string) {
    const draft = workspaceDrafts[id];
    if (!draft) return;
    setSaveState((current) => ({ ...current, [id]: "Saving…" }));
    try {
      const response = await authorizedFetch("/api/assessments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          consultationWorkspace: {
            notes: draft.notes,
            summary: draft.summary,
            implementationPlan: draft.implementationPlan,
          },
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to save consultation notes.");
      setSubmissions((items) => items.map((item) => item.id === id ? {
        ...item,
        consultation_notes: draft.notes,
        consultation_summary: draft.summary,
        implementation_plan_notes: draft.implementationPlan,
      } : item));
      setSaveState((current) => ({ ...current, [id]: "Saved" }));
    } catch (caught) {
      setSaveState((current) => ({ ...current, [id]: caught instanceof Error ? caught.message : "Save failed" }));
    }
  }

  const visible = submissions.filter((item) => {
    if (filter === "leads") return item.contact_requested;
    if (filter === "assessments") return !item.contact_requested;
    return true;
  });

  if (!signedIn && !loading) {
    return (
      <div className={styles.loginCard}>
        <h1>Assessment Inbox</h1>
        <p>Sign in with an authorized Google account to review completed assessments and consultation requests.</p>
        <button className={styles.signin} onClick={signIn}><LogIn size={14} /> Sign in with Google</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.heading}>
        <div>
          <h1>Assessment Inbox</h1>
          <p>{userEmail ? `Signed in as ${userEmail}` : "Loading account…"} · {submissions.length} stored submissions</p>
        </div>
        <div className={styles.controls}>
          <button className={`${styles.control} ${filter === "leads" ? styles.controlActive : ""}`} onClick={() => setFilter("leads")}>Consultation leads</button>
          <button className={`${styles.control} ${filter === "assessments" ? styles.controlActive : ""}`} onClick={() => setFilter("assessments")}>Assessment only</button>
          <button className={`${styles.control} ${filter === "all" ? styles.controlActive : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={styles.control} disabled={creatingTest} onClick={() => void createTestAssessment()}><FlaskConical size={13} /> {creatingTest ? "Creating…" : "Create test assessment"}</button>
          <button className={styles.control} onClick={() => void load()}><RefreshCw size={13} /> Refresh</button>
          <button className={styles.control} onClick={signOut}>Sign out</button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading ? <div className={styles.empty}>Loading assessment inbox…</div> : visible.length === 0 ? <div className={styles.empty}>Nothing in this view yet.</div> : (
        <div className={styles.grid}>
          {visible.map((item) => {
            const open = expanded === item.id;
            const guide = generateConsultationGuide(item.assessment_type, item.answers || []);
            const priorityCount = guide.filter((entry) => entry.priority === "critical" || entry.priority === "high").length;
            const draft = workspaceDrafts[item.id] || workspaceFromSubmission(item);
            return (
              <article className={styles.card} key={item.id}>
                <button className={styles.cardHead} onClick={() => setExpanded(open ? null : item.id)}>
                  <div className={styles.primary}>
                    <strong>{item.contact_requested ? (item.contact_company || item.contact_name || "Consultation lead") : item.assessment_title} {item.is_test ? <em className={styles.testTag}>TEST</em> : null}</strong>
                    <span>{item.assessment_title} · {new Date(item.created_at).toLocaleString()}</span>
                  </div>
                  <div className={styles.score}><strong>{item.score}/100</strong><span>{item.rating}</span></div>
                  <div className={styles.contact}>
                    <strong>{item.contact_requested ? item.contact_name : "Anonymous assessment"}</strong>
                    <span>{item.contact_requested ? item.contact_email : "No consultation requested"}</span>
                  </div>
                  <div className={styles.cardStatus}>
                    <span className={`${styles.badge} ${item.consultation_status === "new" ? styles.badgeNew : ""}`}>{item.consultation_status}</span>
                    {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                {open && (
                  <div className={styles.detail}>
                    <div className={styles.detailGrid}>
                      <div>
                        <h3>Submission</h3>
                        <div className={styles.infoList}>
                          <div><span>Score</span><strong>{item.score}/100 — {item.rating}</strong></div>
                          <div><span>Name</span><strong>{item.contact_name || "Not provided"}</strong></div>
                          <div><span>Company</span><strong>{item.contact_company || "Not provided"}</strong></div>
                          <div><span>Email</span>{item.contact_email ? <a href={`mailto:${item.contact_email}`}>{item.contact_email}</a> : <strong>Not provided</strong>}</div>
                          <div><span>Phone</span><strong>{item.contact_phone || "Not provided"}</strong></div>
                          <div><span>Requested help</span><strong>{item.contact_notes || "Not provided"}</strong></div>
                          <div><span>Category scores</span><strong>{item.category_scores ? Object.entries(item.category_scores).map(([key, value]) => `${key}: ${value}%`).join(" · ") : "None"}</strong></div>
                          <div><span>Critical flags</span><strong>{item.critical_flags?.length ? item.critical_flags.map((flag) => flag.title).join(" · ") : "None"}</strong></div>
                        </div>
                        <div className={styles.actions}>
                          {item.contact_requested && <button className={styles.statusButton} onClick={() => void updateStatus(item.id, "reviewed")}>Mark reviewed</button>}
                          {item.contact_requested && <button className={styles.statusButton} onClick={() => void updateStatus(item.id, "contacted")}>Mark contacted</button>}
                          <button className={styles.statusButton} onClick={() => void updateStatus(item.id, "closed")}>Close</button>
                        </div>
                      </div>
                      <div>
                        <h3>Assessment answers</h3>
                        <div className={styles.answers}>
                          {(item.answers || []).map((answer) => (
                            <div className={styles.answer} key={answer.id}>
                              <span>{answer.category}</span>
                              <p>{answer.question}</p>
                              <strong>{answer.answerLabel}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <section className={styles.consultationWorkspace}>
                      <div className={styles.workspaceHeading}>
                        <div>
                          <span className={styles.workspaceEyebrow}>CONSULTATION WORKSPACE</span>
                          <h2>Client interview guide</h2>
                          <p>{priorityCount} priority gap{priorityCount === 1 ? "" : "s"} surfaced from this assessment. Questions are automatically ordered from highest risk to validation items.</p>
                        </div>
                        <div className={styles.saveArea}>
                          <span>{saveState[item.id] || ""}</span>
                          <button className={styles.saveButton} onClick={() => void saveWorkspace(item.id)}><Save size={14} /> Save consultation notes</button>
                        </div>
                      </div>

                      <div className={styles.guideList}>
                        {guide.map((entry) => (
                          <article className={`${styles.guideItem} ${styles[`priority_${entry.priority}`]}`} key={entry.questionId}>
                            <div className={styles.guideHeader}>
                              <span className={styles.priority}>{entry.priority === "validation" ? "VALIDATE" : entry.priority.toUpperCase()}</span>
                              <span>{entry.category}</span>
                            </div>

                            <div className={styles.guideColumns}>
                              <div className={styles.interviewPane}>
                                <span className={styles.smallLabel}>QUESTION TO ASK</span>
                                <h4>{entry.followUps[0]}</h4>
                                <p className={styles.secondQuestion}>{entry.followUps[1]}</p>
                                <div className={styles.responseContext}>
                                  <div><span>They answered</span><strong>{entry.assessmentAnswerLabel}</strong></div>
                                  <div><span>Original assessment item</span><p>{entry.assessmentQuestion}</p></div>
                                </div>
                                <label className={styles.noteLabel}>
                                  Client answer / your notes
                                  <textarea
                                    value={draft.notes[entry.questionId] || ""}
                                    onChange={(event) => updateQuestionNote(item.id, entry.questionId, event.target.value)}
                                    placeholder="Capture what they tell you, names of owners, systems, dates, evidence, blockers, commitments, follow-up items…"
                                  />
                                </label>
                              </div>

                              <aside className={styles.coachPane}>
                                <div className={styles.coachBlock}>
                                  <span>What a strong answer looks like</span>
                                  <p>{entry.suggestedAnswer}</p>
                                </div>
                                <div className={styles.coachBlock}>
                                  <span>Consultant note</span>
                                  <p>{entry.consultantPrompt}</p>
                                </div>
                                <div className={styles.coachBlock}>
                                  <span>Evidence to request</span>
                                  <p>{entry.evidence}</p>
                                </div>
                                <div className={styles.coachBlock}>
                                  <span>Talking points</span>
                                  <ul>{entry.talkingPoints.map((point) => <li key={point}>{point}</li>)}</ul>
                                </div>
                              </aside>
                            </div>
                          </article>
                        ))}
                      </div>

                      <div className={styles.wrapUpGrid}>
                        <label className={styles.wrapUpField}>
                          <span>Consultation summary</span>
                          <textarea
                            value={draft.summary}
                            onChange={(event) => updateWorkspaceField(item.id, "summary", event.target.value)}
                            placeholder="Summarize the environment, business drivers, key risks, ownership gaps, and decisions made during the consultation."
                          />
                        </label>
                        <label className={styles.wrapUpField}>
                          <span>Implementation plan notes</span>
                          <textarea
                            value={draft.implementationPlan}
                            onChange={(event) => updateWorkspaceField(item.id, "implementationPlan", event.target.value)}
                            placeholder="Draft the recommended phases, immediate actions, owners, dependencies, deliverables, and suggested timeline."
                          />
                        </label>
                      </div>

                      <div className={styles.workspaceFooter}>
                        <span>{saveState[item.id] || "Notes are private to the admin workspace."}</span>
                        <button className={styles.saveButton} onClick={() => void saveWorkspace(item.id)}><Save size={14} /> Save consultation notes</button>
                      </div>
                    </section>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
