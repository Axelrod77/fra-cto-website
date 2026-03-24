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

      {/* Hero — dark navy for premium impact */}
      <section className="py-20 md:py-28 px-6 bg-[var(--color-navy)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-navy-mid)] text-[var(--color-teal)] text-sm font-medium mb-6 border border-[var(--color-teal)]/20">
            Fractional CTO for Enterprise AI
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            It looks like AI.<br />
            It works because of the<br />
            <span className="text-[var(--color-teal)]">human inside.</span>
          </h1>
          <p className="text-lg text-[#78909C] max-w-2xl mx-auto mb-10 leading-relaxed">
            Independent advisory for enterprises navigating AI transformation.
            No vendor bias. No headcount incentives. Just honest strategy and embedded execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quick-scan">
              <Button size="lg" className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-8 h-12">
                Take the Quick Scan
              </Button>
            </Link>
            <Link href="/express-interest">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent px-8 h-12">
                Express Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-[var(--color-muted)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-4 text-center">
            Why enterprises get stuck
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-center max-w-2xl mx-auto mb-12">
            Your Big IT partners have a conflict of interest. Automation cannibalizes their headcount model.
            They&apos;ll slow-walk your transformation while billing for the delay.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No honest assessment",
                desc: "Legacy partners can't recommend eliminating roles they profit from.",
              },
              {
                title: "Strategy without execution",
                desc: "Consultancies deliver decks, then disappear. Plans collect dust.",
              },
              {
                title: "Internal silos",
                desc: "CIOs freeze on failure stats. Teams resist change. Nobody owns the cross-cutting work.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border/50 border-l-[3px] border-l-[var(--color-teal)]">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-[var(--color-plum)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-12 text-center">
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
                <div className="w-12 h-12 rounded-full bg-[var(--color-teal)] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[var(--color-plum)] mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-4">{item.desc}</p>
                {item.cta && item.href && (
                  <Link href={item.href}>
                    <Button variant="ghost" className="text-[var(--color-periwinkle)] hover:text-[var(--color-plum)] hover:bg-[var(--color-periwinkle-lighter)]">
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-4 text-center">
            Who&apos;s behind FraCTO
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-center max-w-2xl mx-auto mb-12">
            Three founders with complementary expertise — enterprise IT, business building, and AI engineering.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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
              <Card key={founder.role} className="border-border/50 border-t-[3px] border-t-[var(--color-teal)]">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-[var(--color-plum)] text-lg mb-3">{founder.role}</h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-4">{founder.desc}</p>
                  <div className="text-xs font-medium text-[var(--color-periwinkle)]">{founder.credential}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Human Inside — Mechanical Turk storytelling */}
      <section className="py-20 px-6 bg-[var(--color-muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-border/50">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                poster="/turk-poster.jpg"
              >
                <source src="/turk.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-xs text-white/70 italic">The Mechanical Turk, 1770</p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-6 leading-tight">
                In 1770, a machine stunned the world by beating grandmasters at chess.
              </h2>
              <div className="space-y-4 text-[var(--color-muted-foreground)] leading-relaxed">
                <p>
                  For decades, emperors and scientists marveled at the automaton&apos;s intelligence.
                  Napoleon played it. Benjamin Franklin studied it. No one could explain how a machine
                  could think so brilliantly.
                </p>
                <p>
                  The secret? A grandmaster hidden inside the cabinet, guiding every move through
                  an ingenious system of levers and magnets.
                </p>
                <p className="text-[var(--color-plum)] font-semibold text-lg">
                  250 years later, the same truth holds.
                </p>
                <p>
                  AI tools are everywhere. But without a senior technologist inside — someone who
                  knows your architecture, your politics, your constraints — they&apos;re just theater.
                </p>
                <p className="text-[var(--color-plum)] font-semibold border-l-[3px] border-l-[var(--color-teal)] pl-4">
                  FraCTO is the human inside the machine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)] mb-8 text-center">
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
              <Card key={service.title} className="border-border/50 hover:border-[var(--color-periwinkle)] transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-[var(--color-plum)] text-lg mb-1">{service.title}</h3>
                  <div className="text-xs text-[var(--color-muted-foreground)] mb-4">{service.duration}</div>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="text-sm text-[var(--color-muted-foreground)] flex items-start gap-2">
                        <span className="text-[var(--color-periwinkle)] mt-0.5">&#10003;</span>
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
      <section id="express-interest" className="py-16 px-6 bg-[var(--color-navy)]">
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
