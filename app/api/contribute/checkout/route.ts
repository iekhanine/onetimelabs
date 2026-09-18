import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MIN_DOLLARS = 5;
const MAX_DOLLARS = 10000;

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const amount = Number(body?.amount);

    if (!Number.isFinite(amount) || amount < MIN_DOLLARS || amount > MAX_DOLLARS) {
      return NextResponse.json(
        { error: `Amount must be between $${MIN_DOLLARS} and $${MAX_DOLLARS.toLocaleString()}.` },
        { status: 400 },
      );
    }

    const amountInCents = Math.round(amount * 100);
    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const origin = configuredOrigin || request.nextUrl.origin;

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("success_url", `${origin}/contribute?status=success&session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${origin}/contribute?status=cancelled`);
    params.set("payment_method_types[0]", "card");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(amountInCents));
    params.set("line_items[0][price_data][product_data][name]", "Support OneTime Labs");
    params.set(
      "line_items[0][price_data][product_data][description]",
      "Voluntary support payment to OneTime Labs. No equity, ownership, repayment rights, products, or services are included.",
    );
    params.set("line_items[0][quantity]", "1");
    params.set("submit_type", "pay");
    params.set("billing_address_collection", "auto");
    params.set("metadata[purpose]", "otl_support");
    params.set("payment_intent_data[metadata][purpose]", "otl_support");

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok || !session?.url) {
      console.error("Stripe Checkout error:", session);
      return NextResponse.json(
        { error: session?.error?.message || "Unable to create Stripe Checkout session." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Contribution checkout error:", error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}
