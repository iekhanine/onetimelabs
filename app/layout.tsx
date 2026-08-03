
// @ts-expect-error - Next.js handles global CSS imports
import "./globals.css";

export const metadata = {
  title: "OneTime Labs",
  description:
    "Professional software built from real operational experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}