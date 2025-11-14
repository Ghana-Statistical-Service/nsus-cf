import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NSUs-CF – Ghana Non-Standard Units Conversion Factor",
  description:
    "Web-based system for converting Ghana's local non-standard units into standard units.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white">{children}</body>
    </html>
  );
}
