import { notFound } from "next/navigation";
import { getDemoSite } from "@/lib/business-site/demos";
import AdminDemo from "./AdminDemo";
import SalonAdminDemo from "@/components/salon/SalonAdminDemo";
import "../../../[slug]/site.css";
export default async function DemoAdminPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params; const site=getDemoSite(code); if(!site) notFound();
  if(site.layout.style_key==="editorial-studio") return <SalonAdminDemo site={site}/>;
  if(["clean-service","workshop-dark"].includes(site.layout.style_key)) return <AdminDemo site={site}/>;
  notFound();
}
