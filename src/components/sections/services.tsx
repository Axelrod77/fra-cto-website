'use client'

import { SectionLabel } from '@/components/section-label'
import { SpringCard } from '@/components/spring-card'

const services = [
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
]

export function ServicesSection() {
  return (
    <section className="flex flex-col justify-center px-6 py-12 bg-[var(--color-light-bg)]">
      <div className="max-w-5xl mx-auto w-full">
        <SectionLabel text="Services" color="navy" className="mb-10 block" />
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SpringCard key={service.title} entranceDelay={i * 100}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-black/5 h-full flex flex-col">
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="font-semibold text-[var(--color-light-text)] text-xl">{service.title}</h3>
                  <span className="text-xs text-[var(--color-teal)] font-mono font-medium bg-[var(--color-teal)]/10 px-2.5 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>
                <ul className="space-y-4">
                  {service.items.map((item) => (
                    <li key={item} className="text-base text-[var(--color-light-muted)] flex items-start gap-3">
                      <span className="text-[var(--color-teal)] mt-2 text-[7px]">&#9679;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SpringCard>
          ))}
        </div>
      </div>
    </section>
  )
}
