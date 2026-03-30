"use client";

import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpressInterestForm } from "@/components/express-interest-form";

function ExpressInterestInner() {
  return (
    <div className="min-h-screen bg-background flex flex-col light-page">
      <SiteHeader />

      <section className="py-16 px-6 flex-1">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-plum)] mb-4">
              Express Interest
            </h1>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Tell us about your organization and your AI transformation goals.
              We&apos;ll reach out to discuss how FraCTO can help.
            </p>
          </div>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <ExpressInterestForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default function ExpressInterestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[var(--color-muted-foreground)]">Loading...</div>
        </div>
      }
    >
      <ExpressInterestInner />
    </Suspense>
  );
}
