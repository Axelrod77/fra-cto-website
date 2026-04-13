import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Loader } from "@/components/loader";
import { WakeRipple } from "@/components/wake-ripple";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserratMono = Montserrat({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FraCTO — Fractional CTO for AI Transformation",
  description:
    "Independent advisory for startups, GCCs, and enterprises navigating AI transformation. Free digital maturity assessment, diagnostic engagements, and embedded fractional CTO services.",
  openGraph: {
    title: "FraCTO — Fractional CTO for AI Transformation",
    description:
      "Independent advisory for startups, GCCs, and enterprises navigating AI transformation. Free quick scan, diagnostic engagements, and embedded fractional CTO services.",
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
    <html lang="en" className={`${montserrat.variable} ${montserratMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Loader />
        <WakeRipple />
        {children}
      </body>
    </html>
  );
}
