import {
  NextResponse,
} from "next/server";


// ==========================================================
// CONTACT API 001 — CONFIGURATION
// ==========================================================

const CONTACT_EMAIL =
  "inquiry@onetimelabs.net";

const RESEND_ENDPOINT =
  "https://api.resend.com/emails";


// ==========================================================
// CONTACT API 002 — HELPERS
// ==========================================================

function clean(
  value: unknown,
  maxLength: number,
) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// ==========================================================
// CONTACT API 003 — POST /api/contact
// ==========================================================

export async function POST(
  request: Request,
) {
  const apiKey =
    process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Contact form email service is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }

  const name =
    clean(body.name, 120);

  const company =
    clean(body.company, 160);

  const email =
    clean(body.email, 254);

  const projectType =
    clean(body.projectType, 160);

  const details =
    clean(body.details, 5000);

  if (
    !name ||
    !email ||
    !projectType ||
    !details
  ) {
    return NextResponse.json(
      {
        error:
          "Please complete all required fields.",
      },
      {
        status: 400,
      },
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email,
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid email address.",
      },
      {
        status: 400,
      },
    );
  }

  const subject =
    company
      ? `New OneTime Labs inquiry: ${company}`
      : `New OneTime Labs inquiry from ${name}`;

  const html = `
    <h2>New OneTime Labs project inquiry</h2>

    <p>
      <strong>Name:</strong>
      ${escapeHtml(name)}
    </p>

    <p>
      <strong>Company:</strong>
      ${escapeHtml(company || "Not provided")}
    </p>

    <p>
      <strong>Email:</strong>
      ${escapeHtml(email)}
    </p>

    <p>
      <strong>Project type:</strong>
      ${escapeHtml(projectType)}
    </p>

    <hr />

    <p>
      <strong>Project details:</strong>
    </p>

    <p style="white-space: pre-wrap;">
      ${escapeHtml(details)}
    </p>
  `;

  const response =
    await fetch(
      RESEND_ENDPOINT,
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${apiKey}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          from:
            "OneTime Labs <inquiry@onetimelabs.net>",
          to: [
            CONTACT_EMAIL,
          ],
          reply_to:
            email,
          subject,
          html,
        }),
      },
    );

  if (!response.ok) {
    console.error(
      "Contact form email failed:",
      await response.text(),
    );

    return NextResponse.json(
      {
        error:
          "Unable to send your inquiry right now.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json({
    ok: true,
  });
}
