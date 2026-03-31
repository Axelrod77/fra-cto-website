import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Loader } from "@/components/loader";
import { WakeRipple } from "@/components/wake-ripple";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Loader />
        <WakeRipple />
        {children}
      </body>
    </html>
  );
}
