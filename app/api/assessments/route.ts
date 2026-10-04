import { NextResponse } from "next/server";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { Resend } from "resend";

import {
  type AssessmentType,
  assessments,
  calculateAssessment,
  validateAnswers,
} from "@/lib/assessments";

const DEFAULT_NOTIFICATION_EMAIL = "inquiry@onetimelabs.net";
const DEFAULT_FROM_EMAIL = "OneTime Labs <inquiry@onetimelabs.net>";

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function authClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isAssessmentType(value: unknown): value is AssessmentType {
  return value === "vendor-migration" || value === "itam";
}

function answerDetail(type: AssessmentType, answers: Record<string, string>) {
  const definition = assessments[type];
  return definition.questions.map((question) => ({
    id: question.id,
    category: question.category,
    question: question.text,
    answer: answers[question.id],
    answerLabel: definition.options.find((option) => option.value === answers[question.id])?.label || answers[question.id],
  }));
}

function sanitizeConsultationNotes(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => /^[a-z]{2}\d{2}$/i.test(key))
      .map(([key, note]) => [key, clean(note, 12000)]),
  );
}

async function sendAdminEmail(subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.ASSESSMENT_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.ASSESSMENT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (error) {
    console.error("Assessment notification email failed:", error);
  }
}

async function sendVisitorConfirmation(email: string, name: string, assessmentTitle: string, score: number, rating: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.ASSESSMENT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to: [email],
      subject: `OneTime Labs received your ${assessmentTitle} request`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#17202b;line-height:1.6">
          <h2 style="margin-bottom:8px">Thanks, ${escapeHtml(name)}.</h2>
          <p>We received your request for a free consultation and implementation plan connected to your <strong>${escapeHtml(assessmentTitle)}</strong>.</p>
          <p>Your score was <strong>${score}/100 — ${escapeHtml(rating)}</strong>.</p>
          <p>OneTime Labs will review the assessment before following up, so the conversation can start with the gaps you already identified instead of repeating the questionnaire.</p>
          <p style="color:#6b7787;font-size:13px">OneTime Labs · inquiry@onetimelabs.net</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Assessment visitor confirmation failed:", error);
  }
}

type AdminAuthorizationResult = {
  user: User | null;
  stage?: "NO_TOKEN" | "AUTH_CONFIG" | "AUTH_VERIFY" | "ADMIN_LOOKUP" | "NOT_AUTHORIZED";
  detail?: string;
};

function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 300);
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message || "Unknown error").slice(0, 300);
  }
  return String(error || "Unknown error").slice(0, 300);
}

async function authorizeAdmin(db: SupabaseClient, request: Request): Promise<AdminAuthorizationResult> {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return { user: null, stage: "NO_TOKEN", detail: "No bearer token was sent." };

  const auth = authClient();
  if (!auth) return { user: null, stage: "AUTH_CONFIG", detail: "Supabase auth client is not configured." };

  let authData;
  try {
    const result = await auth.auth.getUser(token);
    if (result.error) {
      return { user: null, stage: "AUTH_VERIFY", detail: safeErrorMessage(result.error) };
    }
    authData = result.data;
  } catch (error) {
    return { user: null, stage: "AUTH_VERIFY", detail: safeErrorMessage(error) };
  }

  const user = authData.user;
  if (!user?.email) {
    return { user: null, stage: "AUTH_VERIFY", detail: "Supabase returned no email for this session." };
  }

  const email = user.email.toLowerCase();
  const envAdmins = (process.env.OTL_ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, "").toLowerCase())
    .filter(Boolean);

  if (envAdmins.includes(email)) return { user };

  try {
    const { data: admin, error: adminError } = await db
      .from("admin_users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (adminError) {
      return { user: null, stage: "ADMIN_LOOKUP", detail: safeErrorMessage(adminError) };
    }
    if (admin) return { user };
  } catch (error) {
    return { user: null, stage: "ADMIN_LOOKUP", detail: safeErrorMessage(error) };
  }

  return { user: null, stage: "NOT_AUTHORIZED", detail: `Signed-in email ${email} is not in the admin allowlist.` };
}

const testVendorAnswers: Record<string, string> = {
  vm01: "yes", vm02: "partially", vm03: "mostly", vm04: "no", vm05: "mostly",
  vm06: "partially", vm07: "no", vm08: "partially", vm09: "yes", vm10: "no",
  vm11: "unknown", vm12: "partially", vm13: "mostly", vm14: "no", vm15: "partially",
  vm16: "partially", vm17: "no", vm18: "mostly", vm19: "no", vm20: "mostly",
  vm21: "partially", vm22: "no", vm23: "partially", vm24: "no", vm25: "partially",
};

export async function POST(request: Request) {
  const db = serviceClient();
  if (!db) {
    return NextResponse.json({ error: "Assessment database is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.adminAction === "create-test") {
    const authorization = await authorizeAdmin(db, request);
    if (!authorization.user) {
      return NextResponse.json({
        error: `Admin authorization failed [${authorization.stage || "UNKNOWN"}]: ${authorization.detail || "Unknown error"}`,
      }, { status: 403 });
    }
    const user = authorization.user;

    const type: AssessmentType = "vendor-migration";
    const result = calculateAssessment(type, testVendorAnswers);
    const definition = assessments[type];
    const { data, error } = await db
      .from("otl_assessment_submissions")
      .insert({
        assessment_type: type,
        assessment_title: definition.title,
        score: result.score,
        rating: result.rating,
        category_scores: result.categoryScores,
        critical_flags: result.criticalFlags,
        answers: answerDetail(type, testVendorAnswers),
        contact_requested: true,
        contact_name: "Alex Morgan (Test)",
        contact_email: "inquiry@onetimelabs.net",
        contact_company: "Northstar Manufacturing — TEST",
        contact_phone: "(555) 010-2026",
        contact_notes: "TEST RECORD — wants help building a migration readiness plan, clarifying vendor responsibilities, and reducing cutover risk.",
        consultation_status: "new",
        is_test: true,
      })
      .select("id")
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message || "Unable to create test assessment." }, { status: 500 });
    return NextResponse.json({ ok: true, id: data.id });
  }

  if (!isAssessmentType(body.type) || !body.answers || typeof body.answers !== "object") {
    return NextResponse.json({ error: "Invalid assessment submission." }, { status: 400 });
  }

  const type = body.type;
  const answers = body.answers as Record<string, string>;
  if (!validateAnswers(type, answers)) {
    return NextResponse.json({ error: "Please answer every question before submitting." }, { status: 400 });
  }

  const result = calculateAssessment(type, answers);
  const definition = assessments[type];

  const { data, error } = await db
    .from("otl_assessment_submissions")
    .insert({
      assessment_type: type,
      assessment_title: definition.title,
      score: result.score,
      rating: result.rating,
      category_scores: result.categoryScores,
      critical_flags: result.criticalFlags,
      answers: answerDetail(type, answers),
      consultation_status: "assessment-only",
    })
    .select("id,edit_token")
    .single();

  if (error || !data) {
    console.error("Assessment insert failed:", error);
    return NextResponse.json({ error: "Unable to save assessment." }, { status: 500 });
  }

  const categoryRows = Object.entries(result.categoryScores)
    .map(([category, score]) => `<li><strong>${escapeHtml(category)}:</strong> ${score}%</li>`)
    .join("");
  const flagRows = result.criticalFlags.length
    ? `<h3>Critical flags</h3><ul>${result.criticalFlags.map((flag) => `<li><strong>${escapeHtml(flag.title)}:</strong> ${escapeHtml(flag.recommendation)}</li>`).join("")}</ul>`
    : "<p><strong>Critical flags:</strong> None triggered.</p>";

  await sendAdminEmail(
    `Assessment completed: ${definition.shortTitle} — ${result.score}/100`,
    `
      <div style="font-family:Arial,sans-serif;max-width:700px;color:#17202b;line-height:1.55">
        <h2>${escapeHtml(definition.title)}</h2>
        <p><strong>Score:</strong> ${result.score}/100 — ${escapeHtml(result.rating)}</p>
        <p><strong>Contact requested:</strong> No</p>
        <h3>Category breakdown</h3>
        <ul>${categoryRows}</ul>
        ${flagRows}
        <p><a href="https://onetimelabs.net/admin/assessments">Open Assessment Inbox</a></p>
        <p style="color:#6b7787;font-size:12px">Submission ID: ${data.id}</p>
      </div>
    `,
  );

  return NextResponse.json({ id: data.id, editToken: data.edit_token, result });
}

export async function PATCH(request: Request) {
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: "Assessment database is not configured." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = clean(body.id, 80);
  const editToken = clean(body.editToken, 80);
  const contact = body.contact && typeof body.contact === "object" ? body.contact as Record<string, unknown> : null;

  if (contact) {
    const name = clean(contact.name, 120);
    const email = clean(contact.email, 254).toLowerCase();
    const company = clean(contact.company, 160);
    const phone = clean(contact.phone, 50);
    const notes = clean(contact.notes, 3000);

    if (!id || !editToken || !name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Name and a valid email address are required." }, { status: 400 });
    }

    const { data: current, error: currentError } = await db
      .from("otl_assessment_submissions")
      .select("id,assessment_type,assessment_title,score,rating,category_scores,critical_flags")
      .eq("id", id)
      .eq("edit_token", editToken)
      .maybeSingle();

    if (currentError || !current) {
      return NextResponse.json({ error: "Assessment could not be found." }, { status: 404 });
    }

    const { error } = await db
      .from("otl_assessment_submissions")
      .update({
        contact_requested: true,
        contact_name: name,
        contact_email: email,
        contact_company: company || null,
        contact_phone: phone || null,
        contact_notes: notes || null,
        consultation_status: "new",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("edit_token", editToken);

    if (error) {
      console.error("Assessment contact update failed:", error);
      return NextResponse.json({ error: "Unable to save consultation request." }, { status: 500 });
    }

    const categories = current.category_scores && typeof current.category_scores === "object"
      ? Object.entries(current.category_scores as Record<string, number>)
          .map(([category, score]) => `<li><strong>${escapeHtml(category)}:</strong> ${score}%</li>`)
          .join("")
      : "";

    await sendAdminEmail(
      `Consultation requested: ${current.assessment_title} — ${name}`,
      `
        <div style="font-family:Arial,sans-serif;max-width:700px;color:#17202b;line-height:1.55">
          <h2>New assessment consultation request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Assessment:</strong> ${escapeHtml(current.assessment_title)}</p>
          <p><strong>Score:</strong> ${current.score}/100 — ${escapeHtml(current.rating)}</p>
          ${notes ? `<h3>What they want help with</h3><p style="white-space:pre-wrap">${escapeHtml(notes)}</p>` : ""}
          <h3>Category breakdown</h3><ul>${categories}</ul>
          <p><a href="https://onetimelabs.net/admin/assessments">Open Assessment Inbox</a></p>
        </div>
      `,
      email,
    );

    await sendVisitorConfirmation(email, name, current.assessment_title, current.score, current.rating);
    return NextResponse.json({ ok: true });
  }

  const authorization = await authorizeAdmin(db, request);
  if (!authorization.user) {
    return NextResponse.json({
      error: `Admin authorization failed [${authorization.stage || "UNKNOWN"}]: ${authorization.detail || "Unknown error"}`,
    }, { status: 403 });
  }
  const user = authorization.user;
  if (!id) return NextResponse.json({ error: "Assessment ID is required." }, { status: 400 });

  if (body.consultationWorkspace && typeof body.consultationWorkspace === "object") {
    const workspace = body.consultationWorkspace as Record<string, unknown>;
    const consultationNotes = sanitizeConsultationNotes(workspace.notes);
    const consultationSummary = clean(workspace.summary, 30000);
    const implementationPlanNotes = clean(workspace.implementationPlan, 30000);

    const { error } = await db
      .from("otl_assessment_submissions")
      .update({
        consultation_notes: consultationNotes,
        consultation_summary: consultationSummary || null,
        implementation_plan_notes: implementationPlanNotes || null,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const status = clean(body.status, 30);
  const allowed = new Set(["assessment-only", "new", "reviewed", "contacted", "closed"]);
  if (!allowed.has(status)) {
    return NextResponse.json({ error: "Invalid status update." }, { status: 400 });
  }

  const { error } = await db
    .from("otl_assessment_submissions")
    .update({
      consultation_status: status,
      reviewed_at: status === "assessment-only" || status === "new" ? null : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: "Assessment database is not configured [SERVICE_CONFIG]." }, { status: 503 });

  const authorization = await authorizeAdmin(db, request);
  if (!authorization.user) {
    return NextResponse.json({
      error: `Admin authorization failed [${authorization.stage || "UNKNOWN"}]: ${authorization.detail || "Unknown error"}`,
    }, { status: 403 });
  }
  const user = authorization.user;

  try {
    const { data, error } = await db
      .from("otl_assessment_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(250);

    if (error) {
      return NextResponse.json({ error: `Assessment query failed [SUBMISSIONS_QUERY]: ${safeErrorMessage(error)}` }, { status: 500 });
    }
    return NextResponse.json({ submissions: data || [], adminEmail: user.email });
  } catch (error) {
    return NextResponse.json({ error: `Assessment query failed [SUBMISSIONS_QUERY]: ${safeErrorMessage(error)}` }, { status: 500 });
  }
}
