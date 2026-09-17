import type {
  ReactNode,
} from "react";

import type {
  Metadata,
} from "next";

import "./globals.css";
import "./company-store.css";


export const metadata: Metadata = {
  metadataBase:
    new URL(
      "https://onetimelabs.net"
    ),

  title: {
    default:
      "OneTime Labs | Vendor Migration & Enterprise Consulting",
    template:
      "%s | OneTime Labs",
  },

  description:
    "OneTime Labs provides vendor migration, Managed Print Services, enterprise technology consulting, ITAM/SAM expertise, architecture, and purpose-built operational software in Racine, Milwaukee, Chicago, and remotely.",

  openGraph: {
    title:
      "OneTime Labs | Vendor Migration & Enterprise Consulting",

    description:
      "Vendor migration, Managed Print Services, enterprise architecture, ITAM/SAM, and purpose-built operational software from OneTime Labs.",

    url:
      "https://onetimelabs.net",

    siteName:
      "OneTime Labs",

    type:
      "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
