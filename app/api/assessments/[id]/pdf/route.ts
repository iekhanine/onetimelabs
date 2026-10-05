import { authorizeAssessmentAdmin, getAssessmentServiceClient } from "@/lib/assessment-server";
import { buildAssessmentReportPdf, type AssessmentReportSubmission } from "@/lib/assessment-pdf";
import { getOtlReportLogoJpeg } from "@/lib/otl-report-logo";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

function filenameFor(submission: AssessmentReportSubmission) {
  const base = submission.contact_company || submission.contact_name || submission.assessment_title || "assessment-report";
  const safe = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "assessment-report";
  return `${safe}-assessment-report.pdf`;
}

export async function GET(request: Request, { params }: Props) {
  const db = getAssessmentServiceClient();
  if (!db) return new Response("Assessment database is not configured.", { status: 503 });

  const authorization = await authorizeAssessmentAdmin(db, request);
  if (!authorization.user) return new Response("Admin access required.", { status: 403 });

  const { id } = await params;
  const { data, error } = await db
    .from("otl_assessment_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) return new Response(error.message, { status: 500 });
  if (!data) return new Response("Assessment not found.", { status: 404 });

  const logo = getOtlReportLogoJpeg();
  const pdf = buildAssessmentReportPdf(data as AssessmentReportSubmission, logo);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filenameFor(data as AssessmentReportSubmission)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
