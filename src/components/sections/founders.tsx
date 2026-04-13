'use client'

import { SectionLabel } from '@/components/section-label'
import { SpringCard } from '@/components/spring-card'

const founders = [
  {
    role: "Senior IT Leader",
    arrow: "becomes the",
    bridge: "Fractional CTO",
    desc: "Decades leading IT transformations at scale. Knows the vendor ecosystems, partner dynamics, and stakeholder politics from the inside — and what realistic looks like.",
    credential: "MBA, SP Jain Inst of Mgmt.",
    accent: "primary",
  },
  {
    role: "AI-Native Technologist",
    arrow: "brings the",
    bridge: "Execution Depth",
    desc: "Functional and technical depth with AI-first instincts. Builds the assessment platform, designs the 18 AI skills, and keeps every recommendation implementable.",
    credential: "MBA, IIM & B.E. IIT Delhi",
    accent: "secondary",
  },
  {
    role: "Serial Entrepreneur",
    arrow: "scales it to",
    bridge: "Outcomes at Ambition",
    desc: "Track record of building and scaling businesses. Commercial acumen, market positioning, and the drive to turn a small idea into meaningful enterprise value.",
    credential: "MBA, INSEAD",
    accent: "secondary",
  },
]

export function FoundersSection() {
  return (
    <section className="flex flex-col justify-center px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <SectionLabel text="Who's Behind FraCTO" className="mb-3 block" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-navy)] mb-3 leading-tight">
            Three operators. One end-to-end journey.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Enterprise IT instincts, AI-native engineering, and entrepreneurial ambition — combined into a single embedded practice that owns outcomes, not decks.
          </p>
        </div>

        {/* Journey arrow row */}
        <div className="relative">
          {/* Animated connecting line — desktop */}
          <div className="hidden md:block absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[var(--color-teal)] via-[var(--color-teal)]/60 to-[var(--color-teal)]" />
          <div className="hidden md:flex absolute top-[62px] left-0 right-0 justify-between px-[7%] pointer-events-none">
            {founders.map((_, i) => (
              <div key={i} className="w-3.5 h-3.5 rounded-full bg-[var(--color-teal)] ring-4 ring-white shadow" />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            {founders.map((f, i) => (
              <SpringCard key={f.role} entranceDelay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[var(--color-teal)] flex items-center justify-center mb-4 relative z-10 shadow-sm">
                    <span className="text-[var(--color-teal)] font-mono font-bold">0{i + 1}</span>
                  </div>

                  <div className="bg-white border border-[var(--color-navy)]/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow w-full">
                    <h3 className="font-bold text-[var(--color-navy)] text-sm md:text-base leading-tight">{f.role}</h3>
                    <div className="text-[10px] font-mono font-bold text-[var(--color-teal)] uppercase tracking-widest mt-1 mb-3">
                      {f.credential}
                    </div>

                    <div className="py-2 my-2 border-y border-[var(--color-teal)]/20">
                      <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                        {f.arrow}
                      </div>
                      <div className="text-sm font-bold text-[var(--color-navy)] mt-0.5">
                        {f.bridge}
                      </div>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-2">{f.desc}</p>
                  </div>

                  {/* Arrow between cards — mobile */}
                  {i < founders.length - 1 && (
                    <div className="md:hidden my-2 text-[var(--color-teal)] text-xl">&darr;</div>
                  )}
                </div>
              </SpringCard>
            ))}
          </div>
        </div>

        {/* Summary strip */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[var(--color-light-bg)] border border-[var(--color-navy)]/10 rounded-full px-5 py-2.5">
            <span className="text-xs font-mono font-bold text-[var(--color-navy)]">Senior IT Leader</span>
            <span className="text-[var(--color-teal)]">&rarr;</span>
            <span className="text-xs font-mono font-bold text-[var(--color-navy)]">AI-Native Build</span>
            <span className="text-[var(--color-teal)]">&rarr;</span>
            <span className="text-xs font-mono font-bold text-[var(--color-navy)]">Entrepreneurial Scale</span>
          </div>
        </div>
      </div>
    </section>
  )
}
