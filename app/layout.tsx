import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tilo Agency - Digital Growth Solutions",
  description: "Modern digital agency specializing in strategic partnerships and digital growth solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
