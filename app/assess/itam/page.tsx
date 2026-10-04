import AssessmentPage from "../AssessmentPage";
import { itamAssessment } from "@/lib/assessments";

export const metadata = {
  title: "Free IT Asset Management Maturity Assessment",
  description: "Get an immediate ITAM maturity score across governance, data quality, lifecycle, software, financial control, risk, and optimization.",
};

export default function ItamAssessmentPage() {
  return <AssessmentPage definition={itamAssessment} />;
}
