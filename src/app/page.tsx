import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpressInterestForm } from "@/components/express-interest-form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero — Split: Turk video + storytelling */}
      <section className="py-20 md:py-28 px-6 bg-[var(--color-navy)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                preload="auto"
              >
                <source src="/turk.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-xs text-white/70 italic">The Mechanical Turk, 1770</p>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-navy-mid)] text-[var(--color-teal)] text-sm font-medium border border-[var(--color-teal)]/20 w-fit">
                Fractional CTO for Enterprise AI
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                In 1770, a machine stunned the world by beating grandmasters at chess.
              </h1>
              <p className="text-[#78909C] leading-relaxed">
                Napoleon played it. Benjamin Franklin studied it. No one could explain how a machine
                could think so brilliantly. The secret?{" "}
                <strong className="text-[#B0BEC5]">A grandmaster hidden inside</strong>, guiding every move.
              </p>
              <p className="text-[#78909C] leading-relaxed">
                250 years later, the same truth holds. AI tools are everywhere &mdash; but without
                a senior technologist inside your org, they&apos;re just theater.
              </p>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white text-center mt-12">
            FraCTO is the <span className="text-[var(--color-teal)]">human inside</span> the machine.
          </p>
        </div>
      </section>

      {/* The Enterprise AI Challenge */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-3 text-center">
            The enterprise AI challenge
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-center max-w-2xl mx-auto mb-14">
            Most enterprises have the ambition for AI &mdash; but the partners advising them have
            competing incentives. Independent guidance changes the equation.
          </p>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              {
                num: "01",
                title: "Misaligned incentives",
                desc: "Traditional partners advise on transformations that affect their own revenue. Independence removes that tension.",
              },
              {
                num: "02",
                title: "Strategy-execution gap",
                desc: "Great strategies need embedded follow-through. Plans without execution ownership stall.",
              },
              {
                num: "03",
                title: "Organizational complexity",
                desc: "AI transformation cuts across teams, budgets, and reporting lines. Someone needs to own the horizontal.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-5 items-start">
                <span className="text-3xl font-bold text-[var(--color-teal)]/30 leading-none mt-0.5 shrink-0">{item.num}</span>
                <div>
                  <h3 className="font-semibold text-[var(--color-plum)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[var(--color-navy)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-14 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Quick Scan",
                desc: "14 questions, 5 minutes. Get your digital maturity score across 12 dimensions. Free, no sign-up.",
                cta: "Take Quick Scan",
                href: "/quick-scan",
              },
              {
                step: "2",
                title: "Diagnostic",
                desc: "Expert interviews, architecture review, gap analysis, and a board-ready roadmap. Fixed fee, 2-3 weeks.",
                cta: null,
                href: null,
              },
              {
                step: "3",
                title: "Fractional CTO",
                desc: "A senior technologist embedded in your org. Not just advice — execution. Kill redundant tools, ship quick wins, navigate stakeholders.",
                cta: null,
                href: null,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-[var(--color-teal)] text-[var(--color-teal)] font-bold text-xl flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[#78909C] leading-relaxed mb-4">{item.desc}</p>
                {item.cta && item.href && (
                  <Link href={item.href}>
                    <Button variant="ghost" className="text-[var(--color-teal)] hover:text-white hover:bg-[var(--color-teal)]/20">
                      {item.cta} &rarr;
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-3 text-center">
            Who&apos;s behind FraCTO
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-center max-w-2xl mx-auto mb-14">
            Three founders with complementary expertise — enterprise IT, business building, and AI engineering.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Senior IT Leader",
                desc: "Decades of experience leading IT transformations at scale. Has managed the exact vendor ecosystems, partner dynamics, and organizational politics that FraCTO helps clients navigate. Knows what good looks like — and what realistic looks like.",
                credential: "MBA, SP Jain Inst of Mgmt.",
              },
              {
                role: "Serial Entrepreneur",
                desc: "Track record of building and scaling businesses. Brings commercial acumen, market positioning, and the ability to turn a capability into a business. Ensures FraCTO doesn't just advise — it delivers.",
                credential: "MBA, INSEAD",
              },
              {
                role: "AI-Native Technologist",
                desc: "Functional and technical knowledge with AI-first thinking. Builds the assessment platform, designs the AI skills, and ensures every recommendation is technically sound and implementable.",
                credential: "MBA, IIM & B.E. IIT Delhi",
              },
            ].map((founder) => (
              <div key={founder.role} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-teal)]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[var(--color-teal)] text-2xl font-bold">{founder.role[0]}</span>
                </div>
                <h3 className="font-bold text-[var(--color-plum)] text-lg mb-1">{founder.role}</h3>
                <div className="text-xs font-medium text-[var(--color-periwinkle)] mb-3">{founder.credential}</div>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{founder.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-[var(--color-muted)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-10 text-center">
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Diagnostic",
                duration: "2-3 weeks",
                items: ["Expert interviews", "Architecture review", "CMDB analysis", "3-horizon roadmap", "Board-ready deck"],
              },
              {
                title: "Fractional CTO",
                duration: "Ongoing",
                items: ["Embedded senior technologist", "Execution oversight", "Vendor evaluation", "Stakeholder navigation", "Quick wins from Week 1"],
              },
              {
                title: "AI Projects",
                duration: "4-8 weeks",
                items: ["AI skills deployment", "Automation program setup", "Custom AI solutions", "End-to-end delivery", "Knowledge transfer"],
              },
            ].map((service) => (
              <Card key={service.title} className="border-none shadow-md bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-bold text-[var(--color-plum)] text-lg">{service.title}</h3>
                    <span className="text-xs text-[var(--color-teal)] font-medium bg-[var(--color-teal)]/10 px-2 py-0.5 rounded-full">{service.duration}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {service.items.map((item) => (
                      <li key={item} className="text-sm text-[var(--color-muted-foreground)] flex items-start gap-2">
                        <span className="text-[var(--color-teal)] mt-0.5 text-xs">&#9679;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Express Interest Form */}
      <section id="express-interest" className="py-20 px-6 bg-[var(--color-navy)]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Express Interest
          </h2>
          <p className="text-[#78909C] text-center mb-8">
            Tell us about your organization and we&apos;ll reach out to discuss how we can help.
          </p>
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <Suspense fallback={<div className="py-8 text-center text-[var(--color-muted-foreground)]">Loading...</div>}>
                <ExpressInterestForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
