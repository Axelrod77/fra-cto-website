'use client'

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
    <section className="py-20 px-6 bg-[var(--color-navy)]">
      <div className="max-w-4xl mx-auto">
        <SectionLabel text="Who's Behind FraCTO" className="mb-3 block" />
        <p className="text-[var(--color-text-secondary)] max-w-2xl mb-14 leading-relaxed">
          Three founders with complementary expertise — enterprise IT, business building, and AI engineering.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {founders.map((founder, i) => (
            <SpringCard key={founder.role} entranceDelay={i * 100}>
              <div className="bg-[var(--color-navy-mid)] rounded-xl p-6 border border-[var(--color-teal)]/10 h-full">
                <div className="w-14 h-14 rounded-full bg-[var(--color-teal)]/10 flex items-center justify-center mb-4">
                  <span className="text-[var(--color-teal)] text-xl font-bold">{founder.role[0]}</span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">{founder.role}</h3>
                <div className="text-xs font-mono font-medium text-[var(--color-teal)] mb-3">{founder.credential}</div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{founder.desc}</p>
              </div>
            </SpringCard>
          ))}
        </div>
      </div>
    </section>
  )
}
