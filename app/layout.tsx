import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";
import "./company-store.css";
import "./brand-system.css";
import SiteCopyEditor from "@/components/SiteCopyEditor";

export const metadata: Metadata = {
  metadataBase: new URL("https://onetimelabs.net"),
  title: {default:"OneTime Labs | Managed Print Services & Vendor Migrations",template:"%s | OneTime Labs"},
  description:"Independent enterprise managed print consulting, infrastructure engineering and vendor migration services.",
  openGraph: {title:"OneTime Labs | Managed Print Services & Vendor Migrations",description:"Enterprise print infrastructure, fleet management and controlled vendor transitions.",url:"https://onetimelabs.net",siteName:"OneTime Labs",type:"website"},
};
export default function RootLayout({children}:Readonly<{children:ReactNode}>){return <html lang="en"><body>{children}<SiteCopyEditor/></body></html>}
