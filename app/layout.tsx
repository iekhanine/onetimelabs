import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";
import "./company-store.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onetimelabs.net"),
  title: {
    default: "OneTime Labs | Business Technology & Software",
    template: "%s | OneTime Labs",
  },
  description:
    "OneTime Labs builds practical websites, internal tools, reporting, automation, enterprise systems, and provides vendor migration, managed print, ITAM/SAM, and technology consulting.",
  openGraph: {
    title: "OneTime Labs | Business Technology & Software",
    description:
      "Practical technology for small businesses and enterprise environments — from websites and internal tools to vendor migrations and operational software.",
    url: "https://onetimelabs.net",
    siteName: "OneTime Labs",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
