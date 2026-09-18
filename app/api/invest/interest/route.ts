import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_RANGES = new Set([
  "$500–$2,500",
  "$2,500–$10,000",
  "$10,000–$25,000",
  "$25,000+",
]);

const ALLOWED_ACCREDITED = new Set(["Yes", "No", "Unsure"]);
const ALLOWED_STRUCTURES = new Set(["Equity", "SAFE", "Other", "Unsure"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Investor interest email is not configured on this deployment." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const company = String(body?.company || "").trim().slice(0, 180);
    const range = String(body?.range || "").trim();
    const accredited = String(body?.accredited || "").trim();
    const structure = String(body?.structure || "").trim();
    const note = String(body?.note || "").trim().slice(0, 2500);
    const consent = body?.consent === true;
    const website = String(body?.website || "").trim();

    // Honeypot: report success so automated submissions get no useful feedback.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 320) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!ALLOWED_RANGES.has(range)) {
      return NextResponse.json({ error: "Select a potential investment range." }, { status: 400 });
    }

    if (!ALLOWED_ACCREDITED.has(accredited)) {
      return NextResponse.json({ error: "Select an accredited-investor response." }, { status: 400 });
    }

    if (!ALLOWED_STRUCTURES.has(structure)) {
      return NextResponse.json({ error: "Select an investment-structure response." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Confirm that this is only a non-binding indication of interest." },
        { status: 400 },
      );
    }

    const from = process.env.SUPPORT_FROM_EMAIL || "OneTime Labs <inquiry@onetimelabs.net>";
    const to = process.env.INQUIRY_TO_EMAIL || "inquiry@onetimelabs.net";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "<em>Not provided.</em>";
    const safeRange = escapeHtml(range);
    const safeAccredited = escapeHtml(accredited);
    const safeStructure = escapeHtml(structure);
    const safeNote = note ? escapeHtml(note).replaceAll("\n", "<br />") : "<em>No note provided.</em>";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `OTL investor interest — ${name} — ${range}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2>New OneTime Labs investor interest</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Company / occupation:</strong> ${safeCompany}</p>
            <p><strong>Potential range:</strong> ${safeRange}</p>
            <p><strong>Accredited investor response:</strong> ${safeAccredited}</p>
            <p><strong>Structure interest:</strong> ${safeStructure}</p>
            <p><strong>Note:</strong><br />${safeNote}</p>
            <hr />
            <p style="font-size:12px;color:#666">
              The submitter expressly confirmed that this is a non-binding indication of interest only.
              No payment, purchase, reservation, or investment commitment was accepted through this form.
            </p>
          </div>
        `,
      }),
      cache: "no-store",
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend investor interest form error:", result);
      return NextResponse.json(
        { error: result?.message || "Unable to send your investor interest submission." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Investor interest form error:", error);
    return NextResponse.json({ error: "Unable to submit your interest." }, { status: 500 });
  }
}
