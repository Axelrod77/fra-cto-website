'use client'

import Image from 'next/image'
import { SectionLabel } from '@/components/section-label'
import { StaggerGroup } from '@/components/stagger-group'

const pillars = [
  {
    num: "18",
    label: "AI Skills",
    desc: "Each phase — Assess, Align, A'xecute — is backed by structured, reusable skills, not one-off decks.",
  },
  {
    num: "12",
    label: "Dimensions",
    desc: "A shared scorecard everyone can rally around — your team, your partners, your board.",
  },
  {
    num: "E2E",
    label: "Ownership",
    desc: "From first signal to scaled outcome. We stay in the room with SIs, hyperscalers, and your team.",
  },
]

export function ChallengeSection() {
  return (
    <section id="challenge" className="flex flex-col justify-center px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <SectionLabel text="The AI Execution Challenge" className="mb-4 block" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-navy)] mb-5 leading-tight">
              Strategy is solved. Execution is where value gets won.
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              Your strategy is sharp, your partners are world-class, and your teams are motivated. What&apos;s often missing
              is a thin, independent layer that owns the <strong className="text-[var(--color-navy)]">end-to-end</strong> journey
              — insight to outcome, POC to production — across every partner in the stack.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              FraCTO sits alongside Microsoft, AWS, TCS, Databricks, Snowflake, OpenAI, Anthropic and your internal teams.
              Not in competition — in orchestration. Platform-agnostic by design, with no billing to protect.
            </p>

            <StaggerGroup staggerMs={100} className="grid grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div key={p.label} className="border-l-2 border-[var(--color-teal)]/40 pl-3">
                  <div className="text-3xl font-bold text-[var(--color-teal)] leading-none font-mono">{p.num}</div>
                  <div className="text-[10px] uppercase tracking-widest font-mono font-bold text-[var(--color-navy)] mt-1">{p.label}</div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-2">{p.desc}</p>
                </div>
              ))}
            </StaggerGroup>

            <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal)] mt-8 font-bold">
              18 AI Skills × 12 Dimensions × End-to-End Ownership
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden order-first md:order-last shadow-lg">
            <Image
              src="/1.png"
              alt="Cross-functional team aligning on a project plan"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
