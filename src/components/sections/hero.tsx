'use client'

import { useRef } from 'react'
import Link from 'next/link'
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
    <section className="flex flex-col justify-center px-6 pt-4 pb-8 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-[var(--color-navy)] leading-[1.15]">
              In 1770, a machine stunned the world by beating grandmasters at chess.
            </h1>
            <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
              Napoleon played it. Benjamin Franklin studied it. No one could explain how a machine
              could think so brilliantly. The secret?{" "}
              <strong className="text-[var(--color-text-primary)]">A grandmaster analysing, weighing, deciding and manoeuvring the chess board.</strong>
            </p>
            <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
              250 years later, the same truth holds. AI tools are everywhere. Without
              a senior technologist inside your org, they&apos;re just theater.
            </p>
            <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
              From 20-person startups to 5,000-seat GCCs. We embed alongside your team.
            </p>
          </div>

          {/* Video */}
          <div ref={videoRef} className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-navy)]/10 order-1 md:order-2 will-change-transform aspect-[4/5] md:aspect-[1/1]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
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
        <div className="flex justify-center gap-3 mt-6 md:mt-10">
          <Link href="/quick-scan">
            <SpringButton className="bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-dark)] border-none">
              Take the Quick Scan
            </SpringButton>
          </Link>
          <SpringButton
            variant="ghost"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5 border border-[var(--color-navy)]/15"
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn more
          </SpringButton>
        </div>

        {/* Punchline */}
        <p ref={punchlineRef} className="text-xl md:text-2xl font-semibold text-[var(--color-navy)] text-center mt-8 md:mt-12 will-change-transform">
          FraCTO is the <span className="text-[var(--color-teal)]">human inside</span> the machine.
        </p>
      </div>
    </section>
  )
}
