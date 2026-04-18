'use client'

import { useEffect, useState } from 'react'

const CHAPTERS = [
  { label: 'Intro' },
  { label: 'Challenge' },
  { label: 'How it works' },
  { label: 'Founders' },
  { label: 'Services' },
  { label: 'Contact' },
]

export function ScrollIndicator() {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>('.snap-scroll')
    if (!container) return
    const sections = Array.from(container.querySelectorAll<HTMLElement>('section'))
    if (!sections.length) return
    setReady(true)

    const onScroll = () => {
      const top = container.scrollTop
      const h = container.clientHeight
      const idx = Math.min(
        sections.length - 1,
        Math.round(top / h),
      )
      setActive(idx)
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const go = (i: number) => {
    const container = document.querySelector<HTMLDivElement>('.snap-scroll')
    const sections = container?.querySelectorAll<HTMLElement>('section')
    if (!container || !sections || !sections[i]) return
    container.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' })
  }

  if (!ready) return null

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 items-end"
    >
      {CHAPTERS.map((c, i) => {
        const isActive = i === active
        return (
          <button
            key={c.label}
            type="button"
            onClick={() => go(i)}
            className="group relative flex items-center justify-end cursor-pointer h-3 w-3"
            aria-label={`Go to ${c.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`absolute right-6 font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-opacity duration-300 pointer-events-none ${
                isActive
                  ? 'text-[var(--color-navy)] opacity-100'
                  : 'text-[var(--color-navy)]/60 opacity-0 group-hover:opacity-100'
              }`}
            >
              {c.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-2.5 bg-[var(--color-teal)] ring-4 ring-[var(--color-teal)]/15'
                  : 'w-1.5 h-1.5 bg-[var(--color-navy)]/30 group-hover:bg-[var(--color-teal)]'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
