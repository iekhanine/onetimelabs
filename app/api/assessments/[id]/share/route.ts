import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { authorizeAssessmentAdmin, getAssessmentServiceClient } from "@/lib/assessment-server";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

function reportUrl(request: Request, token: string) {
  const configured = (process.env.SITE_URL || "").trim().replace(/\/$/, "");
  const origin = configured || new URL(request.url).origin;
  return `${origin}/assessment-report/${token}`;
}

export async function POST(request: Request, { params }: Props) {
  const db = getAssessmentServiceClient();
  if (!db) return NextResponse.json({ error: "Assessment database is not configured." }, { status: 503 });

  const authorization = await authorizeAssessmentAdmin(db, request);
  if (!authorization.user) {
    return NextResponse.json({ error: `Admin access required [${authorization.stage || "UNKNOWN"}].` }, { status: 403 });
  }

  const { id } = await params;
  const { data, error } = await db
    .from("otl_assessment_submissions")
    .update({
      share_token: randomUUID(),
      share_enabled: true,
      shared_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("share_token,share_enabled,shared_at")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data?.share_token) return NextResponse.json({ error: "Assessment could not be found." }, { status: 404 });

  return NextResponse.json({
    ok: true,
    shareEnabled: true,
    shareToken: data.share_token,
    sharedAt: data.shared_at,
    url: reportUrl(request, data.share_token),
  });
}

export async function DELETE(request: Request, { params }: Props) {
  const db = getAssessmentServiceClient();
  if (!db) return NextResponse.json({ error: "Assessment database is not configured." }, { status: 503 });

  const authorization = await authorizeAssessmentAdmin(db, request);
  if (!authorization.user) {
    return NextResponse.json({ error: `Admin access required [${authorization.stage || "UNKNOWN"}].` }, { status: 403 });
  }

  const { id } = await params;
  const { error } = await db
    .from("otl_assessment_submissions")
    .update({ share_enabled: false, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, shareEnabled: false });
}
