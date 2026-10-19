import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";
import "./company-store.css";
import "./brand-system.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onetimelabs.net"),
  title: {default:"OneTime Labs | IT Asset Management & Inventory Systems",template:"%s | OneTime Labs"},
  description:"IT asset management, hardware lifecycle, software licensing, CMDB improvements, inventory reconciliation, and operational asset systems. Plus retail, warehouse, and general asset management services.",
  openGraph: {title:"OneTime Labs | IT Asset Management & Inventory Systems",description:"Practical ITAM services: hardware and software assets, CMDB data quality, physical inventory, lifecycle controls, and platform implementation.",url:"https://onetimelabs.net",siteName:"OneTime Labs",type:"website"},
};
export default function RootLayout({children}:Readonly<{children:ReactNode}>){return <html lang="en"><body>{children}</body></html>}
