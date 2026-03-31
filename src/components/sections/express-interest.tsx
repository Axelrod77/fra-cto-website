import { Suspense } from 'react'
import { SectionLabel } from '@/components/section-label'
import { ExpressInterestForm } from '@/components/express-interest-form'
import { WhatsRunningSection } from '@/components/sections/whats-running'

export function ExpressInterestSection() {
  return (
    <section id="express-interest" className="py-20 px-6 bg-[var(--color-navy)]">
      <div className="max-w-xl mx-auto">
        <SectionLabel text="Get Started" className="mb-3 block text-center" />
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">
          Express Interest
        </h2>
        <p className="text-[var(--color-text-secondary)] text-center mb-8">
          Tell us about your organization and we&apos;ll reach out to discuss how we can help.
        </p>
        <div className="bg-[var(--color-navy-mid)] rounded-xl border border-[var(--color-teal)]/10 p-6">
          <Suspense fallback={<div className="py-8 text-center text-[var(--color-text-muted)]">Loading...</div>}>
            <ExpressInterestForm />
          </Suspense>
        </div>
      </div>
      {/* What's Running ticker */}
      <WhatsRunningSection />
    </section>
  )
}
