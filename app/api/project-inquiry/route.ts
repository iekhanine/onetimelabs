import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ==========================================================
   PROJECT INQUIRY API 001
   Sends Custom Development inquiries to OneTime Labs
   ========================================================== */

const resend = new Resend(process.env.RESEND_API_KEY);

const INQUIRY_RECIPIENT = "inquiry@onetimelabs.net";

/*
 * IMPORTANT:
 * This sender requires onetimelabs.net to be verified in Resend.
 * Once the domain is verified, any address at the verified domain
 * can be used as the sender.
 */
const INQUIRY_SENDER = "OneTime Labs <inquiry@onetimelabs.net>";

type ProjectInquiry = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  role?: unknown;
  currentProcess?: unknown;
  desiredOutcome?: unknown;
  budget?: unknown;
  timeline?: unknown;
  audience?: unknown;
  currentTool?: unknown;
  additionalDetails?: unknown;
  problem?: unknown;
};

function clean(value: unknown, maxLength = 5000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value: string) {
  return value || "Not provided";
}

function budgetLabel(value: string) {
  const labels: Record<string, string> = {
    "under-1500": "Under $1,500",
    "1500-5000": "$1,500 – $5,000",
    "5000-15000": "$5,000 – $15,000",
    "15000-30000": "$15,000 – $30,000",
    "30000-plus": "$30,000+",
    unknown: "Not sure yet",
  };

  return labels[value] || value;
}

function timelineLabel(value: string) {
  const labels: Record<string, string> = {
    asap: "As soon as practical",
    "1-2-months": "1–2 months",
    "3-6-months": "3–6 months",
    "6-plus-months": "6+ months",
    exploring: "Just exploring",
  };

  return labels[value] || value;
}

function audienceLabel(value: string) {
  const labels: Record<string, string> = {
    individual: "One person",
    team: "A team / department",
    organization: "The organization",
    customers: "Customers / external users",
    mixed: "A mix of users",
  };

  return labels[value] || value;
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ProjectInquiry;

    const name = clean(body.name, 150);
    const company = clean(body.company, 200);
    const email = clean(body.email, 320);
    const role = clean(body.role, 200);
    const currentProcess = clean(body.currentProcess);
    const desiredOutcome = clean(body.desiredOutcome);
    const budget = clean(body.budget, 100);
    const timeline = clean(body.timeline, 100);
    const audience = clean(body.audience, 100);
    const currentTool = clean(body.currentTool, 500);
    const additionalDetails = clean(body.additionalDetails);
    const problem = clean(body.problem);
    const isCompactInquiry = Boolean(problem);

    if (!name || !email || (!problem && (!currentProcess || !desiredOutcome))) {
      return NextResponse.json(
        {
          error:
            "Name, email, and project details are required.",
        },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const subjectCompany = company || "No company";
    const subject = `New Project Inquiry - ${subjectCompany} - ${name}`;

    const compactDetailsHtml = isCompactInquiry
      ? `<h2 style="font-size:17px;margin:0 0 10px;">What are they trying to fix?</h2>
        <div style="white-space:pre-wrap;background:#f3f1eb;padding:18px;margin-bottom:30px;line-height:1.6;">${escapeHtml(problem)}</div>`
      : `<h2 style="font-size:17px;margin:0 0 10px;">What are they doing today?</h2>
        <div style="white-space:pre-wrap;background:#f3f1eb;padding:18px;margin-bottom:26px;line-height:1.6;">${escapeHtml(currentProcess)}</div>

        <h2 style="font-size:17px;margin:0 0 10px;">What would they rather have happen?</h2>
        <div style="white-space:pre-wrap;background:#f3f1eb;padding:18px;margin-bottom:30px;line-height:1.6;">${escapeHtml(desiredOutcome)}</div>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:760px;margin:0 auto;color:#171716;">
        <div style="border-bottom:3px solid #171716;padding-bottom:18px;margin-bottom:28px;">
          <div style="font-size:11px;letter-spacing:1.5px;color:#6f6e69;margin-bottom:8px;">
            ONETIME LABS / CUSTOM DEVELOPMENT
          </div>
          <h1 style="font-size:28px;margin:0;">New Project Inquiry</h1>
        </div>

        <h2 style="font-size:17px;margin:0 0 14px;">Contact</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
          <tr>
            <td style="padding:8px 0;width:180px;color:#6f6e69;">Name</td>
            <td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Company</td>
            <td style="padding:8px 0;">${escapeHtml(display(company))}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Email</td>
            <td style="padding:8px 0;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Role / Title</td>
            <td style="padding:8px 0;">${escapeHtml(display(role))}</td>
          </tr>
        </table>

        ${compactDetailsHtml}

        <h2 style="font-size:17px;margin:0 0 14px;">Project Details</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
          <tr>
            <td style="padding:8px 0;width:180px;color:#6f6e69;">Budget</td>
            <td style="padding:8px 0;">${escapeHtml(display(budgetLabel(budget)))}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Timeline</td>
            <td style="padding:8px 0;">${escapeHtml(display(timelineLabel(timeline)))}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Users</td>
            <td style="padding:8px 0;">${escapeHtml(display(audienceLabel(audience)))}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6f6e69;">Current Tool</td>
            <td style="padding:8px 0;">${escapeHtml(display(currentTool))}</td>
          </tr>
        </table>

        <h2 style="font-size:17px;margin:0 0 10px;">Additional Details</h2>
        <div style="white-space:pre-wrap;background:#f3f1eb;padding:18px;line-height:1.6;">${escapeHtml(display(additionalDetails))}</div>

        <div style="border-top:1px solid #d9d6ce;margin-top:32px;padding-top:18px;color:#6f6e69;font-size:12px;">
          Reply to this email to respond directly to ${escapeHtml(name)}.
        </div>
      </div>
    `;

    const text = `
ONETIME LABS — NEW PROJECT INQUIRY

CONTACT
Name: ${name}
Company: ${display(company)}
Email: ${email}
Role / Title: ${display(role)}

${isCompactInquiry
  ? `WHAT ARE THEY TRYING TO FIX?\n${problem}`
  : `WHAT ARE THEY DOING TODAY?\n${currentProcess}\n\nWHAT WOULD THEY RATHER HAVE HAPPEN?\n${desiredOutcome}`}

PROJECT DETAILS
Budget: ${display(budgetLabel(budget))}
Timeline: ${display(timelineLabel(timeline))}
Users: ${display(audienceLabel(audience))}
Current Tool: ${display(currentTool)}

ADDITIONAL DETAILS
${display(additionalDetails)}

Reply to this email to respond directly to ${name}.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: INQUIRY_SENDER,
      to: [INQUIRY_RECIPIENT],
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Unable to send project inquiry." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Project inquiry error:", error);

    return NextResponse.json(
      { error: "Unable to send project inquiry." },
      { status: 500 },
    );
  }
}