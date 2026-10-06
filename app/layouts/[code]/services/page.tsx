import { notFound } from "next/navigation";
import { getDemoSite } from "@/lib/business-site/demos";
import { PerformanceServicesPage } from "../../../[slug]/BusinessSiteView";
import { SalonServices } from "@/components/salon/SalonSite";
import "../../../[slug]/site.css";
export default async function DemoServicesPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params; const site=getDemoSite(code); if(!site) notFound();
  if(site.layout.style_key==="workshop-dark") return <PerformanceServicesPage site={site} preview/>;
  if(site.layout.style_key==="editorial-studio") return <SalonServices site={site} preview/>;
  notFound();
}
