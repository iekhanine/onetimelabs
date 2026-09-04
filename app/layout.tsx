import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onetimelabs.net"),
  title: {
    default: "OneTime Labs | Purpose-Built Software",
    template: "%s | OneTime Labs",
  },
  description:
    "OneTime Labs builds enterprise software, venue and display platforms, entertainment products, and purpose-built applications around real workflows.",
  openGraph: {
    title: "OneTime Labs",
    description:
      "Enterprise software, venue platforms, entertainment products, and custom applications built around real workflows.",
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
