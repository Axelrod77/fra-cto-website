'use client'

import Link from 'next/link'
import { SectionLabel } from '@/components/section-label'
import { SpringButton } from '@/components/spring-button'
import { StaggerGroup } from '@/components/stagger-group'

const steps = [
  {
    step: "01",
    title: "Quick Scan",
    desc: "14 questions, 5 minutes. Get your digital maturity score across 12 dimensions. Free, no sign-up.",
    cta: "Take Quick Scan",
    href: "/quick-scan",
  },
  {
    step: "02",
    title: "Diagnostic",
    desc: "Expert interviews, architecture review, gap analysis, and a board-ready roadmap. Fixed fee, 2-3 weeks.",
    cta: null,
    href: null,
  },
  {
    step: "03",
    title: "Fractional CTO",
    desc: "A senior technologist embedded in your org. Not just advice — execution. Kill redundant tools, ship quick wins, navigate stakeholders.",
    cta: null,
    href: null,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-[var(--color-light-bg)]">
      <div className="max-w-4xl mx-auto">
        <SectionLabel text="How It Works" color="navy" className="mb-10 block" />

        {/* Horizontal stepper line (desktop only) */}
        <StaggerGroup staggerMs={120} className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[28px] left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-[var(--color-teal)]/30" />

          {steps.map((item) => (
            <div key={item.step} className="text-center relative">
              <div className="w-14 h-14 rounded-full border-2 border-[var(--color-teal)] flex items-center justify-center mx-auto mb-5 bg-[var(--color-light-bg)] relative z-10">
                <span className="text-[var(--color-teal)] text-sm font-mono font-medium">{item.step}</span>
              </div>
              <h3 className="font-semibold text-[var(--color-light-text)] mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-[var(--color-light-muted)] leading-relaxed mb-4">{item.desc}</p>
              {item.cta && item.href && (
                <Link href={item.href}>
                  <SpringButton variant="ghost" className="text-[var(--color-teal)] hover:text-[var(--color-teal-dark)] hover:bg-[var(--color-teal)]/10">
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
