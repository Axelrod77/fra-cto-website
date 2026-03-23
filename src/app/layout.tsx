import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FraCTO — Fractional CTO for Enterprise AI Transformation",
  description:
    "Independent advisory for enterprises navigating AI transformation. Free digital maturity assessment, diagnostic engagements, and embedded fractional CTO services.",
  openGraph: {
    title: "FraCTO — Fractional CTO for Enterprise AI Transformation",
    description:
      "Independent advisory for enterprises navigating AI transformation. Free quick scan, diagnostic engagements, and embedded fractional CTO services.",
    type: "website",
    url: "https://fra-cto.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
