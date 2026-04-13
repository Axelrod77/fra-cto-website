'use client'

import Link from 'next/link'
import { SectionLabel } from '@/components/section-label'
import { SpringButton } from '@/components/spring-button'
import { StaggerGroup } from '@/components/stagger-group'

const steps = [
  {
    step: "00",
    phase: "Start here",
    title: "Quick Scan",
    duration: "5 minutes · Free",
    desc: "14 questions across 12 dimensions. Instant maturity score. No sign-up.",
    cta: "Take Quick Scan",
    href: "/quick-scan",
  },
  {
    step: "01",
    phase: "Phase 1",
    title: "Assess",
    duration: "2 weeks",
    desc: "As-is assessment across 12 dimensions. Stakeholder interviews, architecture review, benchmarking. Quantified baseline.",
    cta: null,
    href: null,
  },
  {
    step: "02",
    phase: "Phase 2",
    title: "Align",
    duration: "2–4 weeks",
    desc: "Strategy, roadmap, and business case. Vendor and partner alignment. Board-ready investment plan with prioritised bets.",
    cta: null,
    href: null,
  },
  {
    step: "03",
    phase: "Phase 3",
    title: "A'xecute",
    duration: "~6 months",
    desc: "Embedded Fractional CTO. Execution governance, vendor orchestration, prototype-to-scale, change management, value tracking.",
    cta: null,
    href: null,
  },
]

export function HowItWorksSection() {
  return (
    <section className="flex flex-col justify-center px-6 py-12 bg-[var(--color-light-bg)]">
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel text="How It Works" color="navy" className="mb-3 block" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-navy)] mb-10 leading-tight">
          One gateway. Three phases. End-to-end ownership.
        </h2>

        <StaggerGroup staggerMs={100} className="grid md:grid-cols-4 gap-5 relative">
          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-[28px] left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-px bg-[var(--color-teal)]/30" />

          {steps.map((item, i) => (
            <div key={item.step} className={`relative bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center text-center ${i === 0 ? 'border-[var(--color-teal)]/40' : 'border-black/5'}`}>
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mx-auto mb-4 bg-[var(--color-light-bg)] relative z-10 ${i === 0 ? 'border-[var(--color-teal)] bg-[var(--color-teal)]/10' : 'border-[var(--color-teal)]'}`}>
                <span className="text-[var(--color-teal)] text-sm font-mono font-bold">{item.step}</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-teal)] mb-1">{item.phase}</div>
              <h3 className="font-bold text-[var(--color-light-text)] mb-1 text-lg">{item.title}</h3>
              <div className="text-xs font-mono text-[var(--color-light-muted)] mb-3">{item.duration}</div>
              <p className="text-sm text-[var(--color-light-muted)] leading-relaxed mb-4">{item.desc}</p>
              {item.cta && item.href && (
                <Link href={item.href} className="mt-auto">
                  <SpringButton variant="ghost" className="text-[var(--color-teal)] hover:text-[var(--color-teal-dark)] hover:bg-[var(--color-teal)]/10 text-sm">
                    {item.cta} &rarr;
                  </SpringButton>
                </Link>
              )}
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
