import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onetimelabs.net"),
  title: {
    default: "OneTime Labs | Less pitch. More product.",
    template: "%s | OneTime Labs",
  },
  description:
    "OneTime Labs builds focused software products including OneTime Menu, OTLES, ROFFLE, and Tasks.",
  openGraph: {
    title: "OneTime Labs",
    description: "Less pitch. More product.",
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
