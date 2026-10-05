import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AssessmentPage from "@/app/assess/AssessmentPage";
import { assessments } from "@/lib/assessments";

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const definition = assessments[type];
  if (!definition) return { title: "Assessment Not Found" };

  return {
    title: definition.title,
    description: definition.intro,
  };
}

export default async function DynamicAssessmentPage({ params }: Props) {
  const { type } = await params;
  const definition = assessments[type];
  if (!definition) notFound();
  return <AssessmentPage definition={definition} />;
}
