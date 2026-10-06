import { notFound } from "next/navigation";
import { getDemoSite } from "@/lib/business-site/demos";
import { LocalServiceContact } from "../../../[slug]/BusinessSiteView";
import { SalonContact } from "@/components/salon/SalonSite";
import "../../../[slug]/site.css";
export default async function DemoContactPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params; const site = getDemoSite(code); if (!site) notFound();
  if(site.layout.style_key==="clean-service") return <LocalServiceContact site={site} preview />;
  if(site.layout.style_key==="editorial-studio") return <SalonContact site={site} preview />;
  notFound();
}
