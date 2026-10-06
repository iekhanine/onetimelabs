import { notFound } from "next/navigation";
import { getBusinessSiteBySlug } from "@/lib/business-site/data";
import { PerformanceServicesPage } from "../BusinessSiteView";
import "../site.css";
export const dynamic="force-dynamic";
export default async function BusinessServicesPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const site=await getBusinessSiteBySlug(slug).catch(()=>null);
 if(!site || site.layout.style_key!=="workshop-dark") notFound();
 return <PerformanceServicesPage site={site} preview={false}/>;
}
