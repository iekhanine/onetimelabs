import { notFound } from "next/navigation";
import { getMetrologyTool } from "../../../../lib/metrology/tools";
import MetrologyInstrument from "./MetrologyInstrument";
import "./tool.css";

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getMetrologyTool(slug);
  if (!tool) notFound();
  return <MetrologyInstrument tool={tool} />;
}
