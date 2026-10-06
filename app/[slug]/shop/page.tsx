import { notFound } from "next/navigation";
import { getBusinessSiteBySlug } from "@/lib/business-site/data";
import { PerformanceShopPage } from "../BusinessSiteView";
import "../site.css";
export const dynamic="force-dynamic";
export default async function BusinessShopPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const site=await getBusinessSiteBySlug(slug).catch(()=>null);
 if(!site || site.layout.style_key!=="workshop-dark") notFound();
 return <PerformanceShopPage site={site} preview={false}/>;
}
