'use client'

import { SectionLabel } from '@/components/section-label'
import { StaggerGroup } from '@/components/stagger-group'

const challenges = [
  {
    num: "01",
    title: "Misaligned incentives",
    desc: "Big IT partners and VC-introduced agencies advise on transformations that affect their own revenue or portfolio. Independence removes that tension.",
  },
  {
    num: "02",
    title: "Strategy-execution gap",
    desc: "Great strategies need embedded follow-through. Plans without execution ownership stall.",
  },
  {
    num: "03",
    title: "Horizontal complexity",
    desc: "From founder-led startups to matrixed enterprises, AI cuts across teams, budgets, and reporting lines. Someone needs to own the horizontal.",
  },
]

export function ChallengeSection() {
  return (
    <section id="challenge" className="flex flex-col justify-center px-6 py-12 bg-white">
      <div className="max-w-3xl mx-auto md:mx-[max(2rem,calc((100%-48rem)/2))]">
        <SectionLabel text="The AI Execution Challenge" className="mb-4 block" />
        <p className="text-[var(--color-text-secondary)] max-w-2xl mb-12 leading-relaxed">
          Whether you&apos;re a 20-person startup or a 5,000-seat GCC, the ambition for AI is
          there &mdash; but the partners advising you have competing incentives. Independent
          guidance changes the equation.
        </p>
        <StaggerGroup staggerMs={100} className="space-y-8">
          {challenges.map((item) => (
            <div key={item.num} className="flex gap-6 items-start">
              <span className="text-5xl font-bold text-[var(--color-teal)]/30 leading-none mt-1 shrink-0 font-mono">
                {item.num}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-1 text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
