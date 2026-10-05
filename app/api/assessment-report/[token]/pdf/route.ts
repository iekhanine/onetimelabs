import { getAssessmentServiceClient } from "@/lib/assessment-server";
import { buildAssessmentReportPdf, type AssessmentReportSubmission } from "@/lib/assessment-pdf";
import { getOtlReportLogoJpeg } from "@/lib/otl-report-logo";

export const runtime = "nodejs";

type Props = { params: Promise<{ token: string }> };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function filenameFor(submission: AssessmentReportSubmission) {
  const base = submission.contact_company || submission.contact_name || submission.assessment_title || "assessment-report";
  const safe = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "assessment-report";
  return `${safe}-assessment-report.pdf`;
}

export async function GET(_request: Request, { params }: Props) {
  const { token } = await params;
  if (!isUuid(token)) return new Response("Report not found.", { status: 404 });

  const db = getAssessmentServiceClient();
  if (!db) return new Response("Report unavailable.", { status: 503 });

  const { data, error } = await db
    .from("otl_assessment_submissions")
    .select("*")
    .eq("share_token", token)
    .eq("share_enabled", true)
    .maybeSingle();

  if (error || !data) return new Response("Report not found.", { status: 404 });

  const logo = getOtlReportLogoJpeg();
  const pdf = buildAssessmentReportPdf(data as AssessmentReportSubmission, logo);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filenameFor(data as AssessmentReportSubmission)}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
