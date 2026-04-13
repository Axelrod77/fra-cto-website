'use client'

import Image from 'next/image'
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
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <SectionLabel text="The AI Execution Challenge" className="mb-4 block" />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-navy)] mb-5 leading-tight">
              The ambition is there. The independence usually isn&apos;t.
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-10 leading-relaxed">
              Whether you&apos;re a 20-person startup or a 5,000-seat GCC, the
              ambition for AI is there &mdash; but the partners advising you have
              competing incentives. Independent guidance changes the equation.
            </p>
            <StaggerGroup staggerMs={100} className="space-y-6">
              {challenges.map((item) => (
                <div key={item.num} className="flex gap-5 items-start">
                  <span className="text-4xl font-bold text-[var(--color-teal)]/30 leading-none mt-1 shrink-0 font-mono">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--color-navy)] mb-1 text-base">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
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
