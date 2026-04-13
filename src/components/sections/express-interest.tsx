import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionLabel } from '@/components/section-label'
import { ExpressInterestForm } from '@/components/express-interest-form'

export function ExpressInterestSection() {
  return (
    <section id="express-interest" className="flex flex-col justify-between px-6 py-8 bg-white">
      {/* Form — centered in available space */}
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
        <SectionLabel text="Get Started" className="mb-3 block text-center" />
        <h2 className="text-xl md:text-2xl font-bold text-[var(--color-navy)] mb-2 text-center">
          Express Interest
        </h2>
        <p className="text-[var(--color-text-secondary)] text-center mb-6">
          Tell us about your organization and we&apos;ll reach out to discuss how we can help.
        </p>
        <div className="bg-white rounded-xl border border-[var(--color-navy)]/10 shadow-sm p-6">
          <Suspense fallback={<div className="py-8 text-center text-[var(--color-text-muted)]">Loading...</div>}>
            <ExpressInterestForm />
          </Suspense>
        </div>
      </div>
      {/* Footer */}
      <div className="pt-4 border-t border-[var(--color-teal)]/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FraCTO" width={20} height={20} className="w-5 h-5" />
            <span className="font-medium text-[var(--color-navy)]">FraCTO</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/quick-scan" className="hover:text-[var(--color-teal)] transition-colors">
              Quick Scan
            </Link>
            <Link href="/express-interest" className="hover:text-[var(--color-teal)] transition-colors">
              Contact
            </Link>
            <span>&copy; {new Date().getFullYear()} FraCTO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
