export const metadata = {
  title: "OneTime Labs",
  description: "Engineering software built from real operational problems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}