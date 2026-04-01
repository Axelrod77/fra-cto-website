import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpressInterestForm } from "@/components/express-interest-form";
import { SectionLabel } from "@/components/section-label";
import { HeroSection } from "@/components/sections/hero";
import { ChallengeSection } from "@/components/sections/challenge";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FoundersSection } from "@/components/sections/founders";
import { ServicesSection } from "@/components/sections/services";
import { ExpressInterestSection } from "@/components/sections/express-interest";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <div className="bg-[var(--color-navy)] snap-scroll">
        <HeroSection />
        <ChallengeSection />
        <HowItWorksSection />
        <FoundersSection />
        <ServicesSection />
        <ExpressInterestSection />
        <SiteFooter />
      </div>
    </>
  );
}
