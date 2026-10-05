"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Copy, Download, ExternalLink, FlaskConical, Link2, LogIn, LogOut, RefreshCw, Save, Unlink } from "lucide-react";
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
  share_token: string | null;
  share_enabled: boolean | null;
  shared_at: string | null;
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
  const [reportState, setReportState] = useState<Record<string, string>>({});
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);

  useEffect(() => {
    try {
      setSupabase(createClient());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to initialize Supabase.");
      setLoading(false);
    }
  }, []);

  async function load() {
    if (!supabase) return;
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
      setSubmissions([]);
      setWorkspaceDrafts({});
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
    if (!supabase) return;
    void load();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "INITIAL_SESSION") void load();
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function signIn() {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/admin/assessments` },
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSignedIn(false);
    setUserEmail("");
    setSubmissions([]);
    window.location.assign("/admin/assessments");
  }

  async function authorizedFetch(url: string, init: RequestInit = {}) {
    if (!supabase) throw new Error("Supabase client is not ready.");
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
    if (!draft) return true;
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
      return true;
    } catch (caught) {
      setSaveState((current) => ({ ...current, [id]: caught instanceof Error ? caught.message : "Save failed" }));
      return false;
    }
  }

  function clientReportPath(item: Submission) {
    return item.share_token ? `/assessment-report/${item.share_token}` : "";
  }

  function clientReportUrl(item: Submission) {
    const path = clientReportPath(item);
    if (!path) return "";
    return `${window.location.origin}${path}`;
  }

  async function downloadPdf(item: Submission) {
    setReportState((current) => ({ ...current, [item.id]: "Saving notes before export…" }));
    if (!(await saveWorkspace(item.id))) {
      setReportState((current) => ({ ...current, [item.id]: "Fix the note save error before exporting." }));
      return;
    }

    try {
      setReportState((current) => ({ ...current, [item.id]: "Building PDF…" }));
      const response = await authorizedFetch(`/api/assessments/${item.id}/pdf`);
      if (!response.ok) throw new Error(await response.text() || "Unable to export PDF.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const base = item.contact_company || item.contact_name || item.assessment_title || "assessment-report";
      anchor.href = url;
      anchor.download = `${base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60)}-assessment-report.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setReportState((current) => ({ ...current, [item.id]: "PDF exported" }));
    } catch (caught) {
      setReportState((current) => ({ ...current, [item.id]: caught instanceof Error ? caught.message : "PDF export failed" }));
    }
  }

  async function enableShare(item: Submission) {
    setReportState((current) => ({ ...current, [item.id]: "Saving notes before sharing…" }));
    if (!(await saveWorkspace(item.id))) {
      setReportState((current) => ({ ...current, [item.id]: "Fix the note save error before sharing." }));
      return;
    }

    try {
      const response = await authorizedFetch(`/api/assessments/${item.id}/share`, { method: "POST" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to create client link.");
      setSubmissions((items) => items.map((current) => current.id === item.id ? {
        ...current,
        share_token: payload.shareToken,
        share_enabled: true,
        shared_at: payload.sharedAt,
      } : current));
      await navigator.clipboard.writeText(payload.url);
      setReportState((current) => ({ ...current, [item.id]: "Client link copied" }));
    } catch (caught) {
      setReportState((current) => ({ ...current, [item.id]: caught instanceof Error ? caught.message : "Unable to create client link" }));
    }
  }

  async function copyShare(item: Submission) {
    const url = clientReportUrl(item);
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setReportState((current) => ({ ...current, [item.id]: "Client link copied" }));
    } catch {
      setReportState((current) => ({ ...current, [item.id]: url }));
    }
  }

  async function disableShare(item: Submission) {
    try {
      const response = await authorizedFetch(`/api/assessments/${item.id}/share`, { method: "DELETE" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to revoke client link.");
      setSubmissions((items) => items.map((current) => current.id === item.id ? { ...current, share_enabled: false } : current));
      setReportState((current) => ({ ...current, [item.id]: "Client link revoked" }));
    } catch (caught) {
      setReportState((current) => ({ ...current, [item.id]: caught instanceof Error ? caught.message : "Unable to revoke client link" }));
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
          <button className={styles.control} onClick={signOut}><LogOut size={13} /> Log out</button>
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
                    {item.share_enabled ? <span className={`${styles.badge} ${styles.badgeShared}`}>shared</span> : null}
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

                      <div className={styles.reportBar}>
                        <div>
                          <span>CLIENT REPORT</span>
                          <strong>Export a branded PDF or send an unlisted client link with the assessment results and your saved notes.</strong>
                          {item.share_enabled && item.share_token ? <code>{clientReportPath(item)}</code> : <small>The client link stays disabled until you create it.</small>}
                          {reportState[item.id] ? <em>{reportState[item.id]}</em> : null}
                        </div>
                        <div className={styles.reportButtons}>
                          <button className={styles.reportButton} onClick={() => void downloadPdf(item)}><Download size={14} /> Export PDF</button>
                          {item.share_enabled && item.share_token ? (
                            <>
                              <button className={styles.reportButton} onClick={() => void copyShare(item)}><Copy size={14} /> Copy link</button>
                              <a className={styles.reportButton} href={clientReportPath(item)} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Open</a>
                              <button className={`${styles.reportButton} ${styles.reportButtonDanger}`} onClick={() => void disableShare(item)}><Unlink size={14} /> Revoke</button>
                            </>
                          ) : (
                            <button className={styles.reportButtonPrimary} onClick={() => void enableShare(item)}><Link2 size={14} /> Create client link</button>
                          )}
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
