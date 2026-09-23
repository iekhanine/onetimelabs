import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const topicLabels: Record<string, string> = {
  business: "Business solutions consultation",
  "business-web": "Website / booking / customer-facing service",
  "business-tools": "Internal tool / job or customer tracking",
  "business-data": "Spreadsheets / reporting / data cleanup",
  // Legacy values retained so older links and bookmarks continue to work.
  "small-business": "Business solutions consultation",
  "small-business-web": "Website / booking / customer-facing service",
  "small-business-tools": "Internal tool / job or customer tracking",
  "small-business-data": "Spreadsheets / reporting / data cleanup",
  "vendor-migration": "Enterprise — vendor migration",
  "managed-print": "Enterprise — Managed Print Services",
  "contact-center": "Enterprise — contact center / Five9 / Genesys",
  consulting: "Enterprise consulting",
  product: "Product question / demo",
  custom: "Enterprise custom software / workflow",
  partnership: "Partnership",
  support: "Product support",
  general: "General inquiry",
};

const productLabels: Record<string, string> = {
  tvm: "OneTime Menu",
  otles: "OTLES",
  roffle: "ROFFLE",
  tasks: "Tasks",
};

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
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

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const company = clean(body.company, 160);
    const topic = clean(body.topic, 40);
    const product = clean(body.product, 40);
    const message = clean(body.message, 6000);
    const website = clean(body.website, 300);
    const source = clean(body.source, 500);

    // Honeypot field. Real visitors never see or fill this.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "The contact service is temporarily unavailable." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const topicLabel = topicLabels[topic] ?? "Website inquiry";
    const productLabel = productLabels[product] ?? "Not product-specific";
    const subjectProduct = productLabels[product] ? ` · ${productLabels[product]}` : "";

    const text = [
      "New OneTime Labs website inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Topic: ${topicLabel}`,
      `Product: ${productLabel}`,
      `Source: ${source || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;line-height:1.55;max-width:720px;margin:0 auto">
        <h1 style="font-size:24px;margin:0 0 22px">New OneTime Labs website inquiry</h1>
        <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
          <tbody>
            <tr><td style="padding:7px 12px 7px 0;font-weight:700;width:130px">Name</td><td style="padding:7px 0">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:7px 12px 7px 0;font-weight:700">Email</td><td style="padding:7px 0">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:7px 12px 7px 0;font-weight:700">Company</td><td style="padding:7px 0">${escapeHtml(company || "Not provided")}</td></tr>
            <tr><td style="padding:7px 12px 7px 0;font-weight:700">Topic</td><td style="padding:7px 0">${escapeHtml(topicLabel)}</td></tr>
            <tr><td style="padding:7px 12px 7px 0;font-weight:700">Product</td><td style="padding:7px 0">${escapeHtml(productLabel)}</td></tr>
          </tbody>
        </table>
        <div style="border-top:1px solid #ddd;padding-top:20px">
          <h2 style="font-size:15px;margin:0 0 10px;text-transform:uppercase;letter-spacing:.05em">Message</h2>
          <div style="white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>
        ${source ? `<p style="margin-top:28px;color:#777;font-size:12px">Submitted from ${escapeHtml(source)}</p>` : ""}
      </div>
    `;

    const recipient = "inquiry@onetimelabs.net";

    const { error } = await resend.emails.send({
      from: "OneTime Labs <inquiry@onetimelabs.net>",
      to: [recipient],
      replyTo: email,
      subject: `[OneTime Labs] ${topicLabel}${subjectProduct} · ${name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { error: "Message could not be sent. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Project inquiry error", error);
    return NextResponse.json(
      { error: "Message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
