import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_RANGES = new Set([
  "Under $500",
  "$500–$2,500",
  "$2,500–$10,000",
  "$10,000+",
]);

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
        { error: "Interest form email is not configured on this deployment." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const range = String(body?.range || "").trim();
    const note = String(body?.note || "").trim().slice(0, 2500);
    const website = String(body?.website || "").trim();

    // Honeypot: return success so bots get no useful signal.
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
      return NextResponse.json({ error: "Select an investment range." }, { status: 400 });
    }

    const from = process.env.SUPPORT_FROM_EMAIL || "OneTime Labs <inquiry@onetimelabs.net>";
    const to = process.env.INQUIRY_TO_EMAIL || "inquiry@onetimelabs.net";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeRange = escapeHtml(range);
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
        subject: `OTL investment interest — ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2>New OneTime Labs investment interest</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Potential range:</strong> ${safeRange}</p>
            <p><strong>Note:</strong><br />${safeNote}</p>
            <hr />
            <p style="font-size:12px;color:#666">
              This submission is a non-binding indication of interest only. No investment funds were accepted through this form.
            </p>
          </div>
        `,
      }),
      cache: "no-store",
    });

    const result = await resendResponse.json();
    if (!resendResponse.ok) {
      console.error("Resend interest form error:", result);
      return NextResponse.json(
        { error: result?.message || "Unable to send your interest submission." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Investment interest form error:", error);
    return NextResponse.json({ error: "Unable to submit your interest." }, { status: 500 });
  }
}
