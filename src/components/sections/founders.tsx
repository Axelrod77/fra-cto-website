'use client'

import Image from 'next/image'
import { SectionLabel } from '@/components/section-label'
import { SpringCard } from '@/components/spring-card'

const founders = [
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
]

export function FoundersSection() {
  return (
    <section className="flex flex-col justify-center px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: copy + compact founder cards */}
          <div className="flex flex-col gap-6">
            <div>
              <SectionLabel text="Who's Behind FraCTO" className="mb-3 block" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-navy)] mb-3 leading-tight">
                Three founders. One operating discipline.
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Complementary expertise across enterprise IT, business building,
                and AI engineering &mdash; combined into a single embedded practice
                that owns outcomes, not decks.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {founders.map((founder, i) => (
                <SpringCard key={founder.role} entranceDelay={i * 80}>
                  <div className="bg-white rounded-lg p-4 border border-[var(--color-navy)]/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-teal)]/10 flex items-center justify-center shrink-0">
                        <span className="text-[var(--color-teal)] text-sm font-bold">{founder.role[0]}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[var(--color-navy)] text-sm leading-tight">{founder.role}</h3>
                        <div className="text-[10px] font-mono font-medium text-[var(--color-teal)] mb-1 uppercase tracking-wider">{founder.credential}</div>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">{founder.desc}</p>
                      </div>
                    </div>
                  </div>
                </SpringCard>
              ))}
            </div>
          </div>

          {/* Right: editorial image */}
          <div className="relative rounded-sm overflow-hidden shadow-lg min-h-[400px] md:min-h-0">
            <Image
              src="/2.png"
              alt="Senior operator reviewing a document in a focused workspace"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
