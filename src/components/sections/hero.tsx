'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { SectionLabel } from '@/components/section-label'
import { SpringButton } from '@/components/spring-button'
import { useSpringTransform } from '@/hooks/use-spring-transform'

export function HeroSection() {
  const videoRef = useRef<HTMLDivElement>(null)
  const punchlineRef = useRef<HTMLParagraphElement>(null)

  useSpringTransform(videoRef, {
    entrance: { translateY: 30, delay: 200 },
  })

  useSpringTransform(punchlineRef, {
    entrance: { translateY: 20, delay: 500 },
  })

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 bg-[var(--color-navy)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="flex flex-col gap-5 order-2 md:order-1">
            <SectionLabel text="Fractional CTO for Enterprise AI" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
              In 1770, a machine stunned the world by beating grandmasters at chess.
            </h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Napoleon played it. Benjamin Franklin studied it. No one could explain how a machine
              could think so brilliantly. The secret?{" "}
              <strong className="text-[var(--color-text-primary)]">A grandmaster analysing, weighing, deciding and manoeuvring the chess board.</strong>
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              250 years later, the same truth holds. AI tools are everywhere &mdash; but without
              a senior technologist inside your org, they&apos;re just theater.
            </p>
          </div>

          {/* Video */}
          <div ref={videoRef} className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 order-1 md:order-2 will-change-transform">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              preload="auto"
            >
              <source src="/turk.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-xs text-white/60 italic font-mono">The Mechanical Turk, 1770</p>
            </div>
          </div>
        </div>

        {/* CTAs — centered below */}
        <div className="flex justify-center gap-3 mt-10">
          <Link href="/quick-scan">
            <SpringButton className="bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-dark)] border-none">
              Take the Quick Scan
            </SpringButton>
          </Link>
          <SpringButton
            variant="ghost"
            className="text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 border border-white/10"
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn more
          </SpringButton>
        </div>

        {/* Punchline */}
        <p ref={punchlineRef} className="text-xl md:text-2xl font-semibold text-white text-center mt-12 will-change-transform">
          FraCTO is the <span className="text-[var(--color-teal)]">human inside</span> the machine.
        </p>
      </div>
    </section>
  )
}
