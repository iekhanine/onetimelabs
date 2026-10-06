import { notFound } from "next/navigation";
import { getBusinessSiteBySlug } from "@/lib/business-site/data";
import { LocalServiceContact } from "../BusinessSiteView";
import "../site.css";
export const dynamic = "force-dynamic";
export default async function BusinessContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getBusinessSiteBySlug(slug).catch(() => null);
  if (!site || site.layout.style_key !== "clean-service") notFound();
  return <LocalServiceContact site={site} />;
}
