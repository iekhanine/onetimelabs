import AssessmentPage from "../AssessmentPage";
import { vendorMigrationAssessment } from "@/lib/assessments";

export const metadata = {
  title: "Free Vendor Migration Risk Assessment",
  description: "Get an immediate 0–100 vendor migration risk score, category breakdown, critical risk flags, and recommended next steps from OneTime Labs.",
};

export default function VendorMigrationAssessmentPage() {
  return <AssessmentPage definition={vendorMigrationAssessment} />;
}
