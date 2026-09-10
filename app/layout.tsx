import type {
  ReactNode,
} from "react";

import type {
  Metadata,
} from "next";

import "./globals.css";


export const metadata: Metadata = {
  metadataBase:
    new URL(
      "https://onetimelabs.net"
    ),

  title: {
    default:
      "OneTime Labs | Software Architecture & Engineering",
    template:
      "%s | OneTime Labs",
  },

  description:
    "OneTime Labs is an independent software engineering studio building purpose-built operational platforms, including OTLES, PlotMap, software licensing infrastructure, and ChangeOps.",

  openGraph: {
    title:
      "OneTime Labs | Software Architecture & Engineering",

    description:
      "Selected engineering work from OneTime Labs: documentation, mapping, licensing, governance, and purpose-built operational software.",

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
