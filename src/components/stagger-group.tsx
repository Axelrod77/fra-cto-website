'use client'

import { useRef, useEffect, useState, Children, type ReactNode } from 'react'
import { createSpring, springSetTarget, springSnapToTarget } from '@/lib/spring'
import { registerSpring, unregisterSpring, isReducedMotion } from '@/lib/spring-manager'

interface StaggerGroupProps {
  children: ReactNode
  staggerMs?: number
  className?: string
}

let groupCounter = 0

export function StaggerGroup({ children, staggerMs = 100, className = '' }: StaggerGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const groupId = useRef(`stagger-${++groupCounter}`)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reduced = isReducedMotion()
    const childEls = Array.from(el.children) as HTMLElement[]
    const springs: { yState: ReturnType<typeof createSpring>; oState: ReturnType<typeof createSpring>; yId: string; oId: string }[] = []

    childEls.forEach((child, i) => {
      const yState = createSpring(reduced ? 0 : 24)
      const oState = createSpring(reduced ? 1 : 0)
      const yId = `${groupId.current}-y-${i}`
      const oId = `${groupId.current}-o-${i}`

      const apply = () => {
        child.style.transform = `translateY(${yState.pos}px)`
        child.style.opacity = `${oState.pos}`
      }

      registerSpring(yId, yState, apply)
      registerSpring(oId, oState, apply)

      if (reduced) {
        apply()
      } else {
        child.style.opacity = '0'
        child.style.transform = 'translateY(24px)'
      }

      springs.push({ yState, oState, yId, oId })
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          springs.forEach(({ yState, oState }, i) => {
            const delay = i * staggerMs
            setTimeout(() => {
              springSetTarget(yState, 0)
              springSetTarget(oState, 1)
            }, delay)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      springs.forEach(({ yId, oId }) => {
        unregisterSpring(yId)
        unregisterSpring(oId)
      })
      childEls.forEach((child) => {
        child.style.transform = ''
        child.style.opacity = ''
      })
    }
  }, [staggerMs])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
