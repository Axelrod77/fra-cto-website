'use client'

import { useEffect, useRef } from 'react'
import { createSpring, springSetTarget, springSnapToTarget, type SpringConfig } from '@/lib/spring'
import { registerSpring, unregisterSpring, isReducedMotion, wakeLoop } from '@/lib/spring-manager'

let idCounter = 0
function nextId(prefix: string) { return `${prefix}-${++idCounter}` }

interface SpringTransformOptions {
  hover?: {
    scale?: number     // e.g. 1.03
    tiltDeg?: number   // max tilt in degrees, e.g. 2
    liftPx?: number    // translateZ, e.g. 8
  }
  magnetic?: {
    strength?: number  // max px displacement, e.g. 4
  }
  entrance?: {
    translateY?: number // start offset in px, e.g. 20
    delay?: number      // ms before triggering
  }
  springConfig?: Partial<SpringConfig>
}

export function useSpringTransform(
  ref: React.RefObject<HTMLElement | null>,
  options: SpringTransformOptions = {}
) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = isReducedMotion()
    const hasFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    const cfg = options.springConfig ?? {}

    // Springs for different axes
    const springs: { id: string; state: ReturnType<typeof createSpring> }[] = []
    let magnetX = createSpring(0, cfg)
    let magnetY = createSpring(0, cfg)
    let scaleSpring = createSpring(1, cfg)
    let tiltX = createSpring(0, cfg)
    let tiltY = createSpring(0, cfg)
    let entranceY = createSpring(options.entrance?.translateY ?? 0, cfg)
    let entranceOpacity = createSpring(options.entrance ? 0 : 1, cfg)

    function applyTransform() {
      const tx = magnetX.pos
      const ty = magnetY.pos + entranceY.pos
      const s = scaleSpring.pos
      const rx = tiltX.pos
      const ry = tiltY.pos
      const op = entranceOpacity.pos

      el!.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`
      el!.style.opacity = `${op}`
    }

    // Register all springs
    const ids = ['mx', 'my', 'sc', 'tx', 'ty', 'ey', 'eo'].map((p) => nextId(p))
    const allSprings = [magnetX, magnetY, scaleSpring, tiltX, tiltY, entranceY, entranceOpacity]
    allSprings.forEach((s, i) => {
      registerSpring(ids[i], s, () => applyTransform())
    })

    // Hover + magnetic effects (desktop only)
    let onPointerMove: ((e: PointerEvent) => void) | null = null
    let onPointerLeave: (() => void) | null = null

    if (hasFinePointer && !reduced) {
      const hoverScale = options.hover?.scale ?? 1
      const tiltDeg = options.hover?.tiltDeg ?? 0
      const magnetStrength = options.magnetic?.strength ?? 0

      onPointerMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)  // -1 to 1
        const dy = (e.clientY - cy) / (rect.height / 2)

        if (magnetStrength > 0) {
          springSetTarget(magnetX, dx * magnetStrength)
          springSetTarget(magnetY, dy * magnetStrength)
        }
        if (hoverScale !== 1) {
          springSetTarget(scaleSpring, hoverScale)
        }
        if (tiltDeg > 0) {
          springSetTarget(tiltX, -dy * tiltDeg)
          springSetTarget(tiltY, dx * tiltDeg)
        }
        wakeLoop()
      }

      onPointerLeave = () => {
        springSetTarget(magnetX, 0)
        springSetTarget(magnetY, 0)
        springSetTarget(scaleSpring, 1)
        springSetTarget(tiltX, 0)
        springSetTarget(tiltY, 0)
        wakeLoop()
      }

      el.addEventListener('pointermove', onPointerMove)
      el.addEventListener('pointerleave', onPointerLeave)
    }

    // Entrance animation via IntersectionObserver
    let observer: IntersectionObserver | null = null
    if (options.entrance) {
      if (reduced) {
        springSnapToTarget(entranceY)
        springSnapToTarget(entranceOpacity)
        entranceY.pos = 0; entranceY.dest = 0
        entranceOpacity.pos = 1; entranceOpacity.dest = 1
        applyTransform()
      } else {
        el.style.opacity = '0'
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              const delay = options.entrance?.delay ?? 0
              setTimeout(() => {
                springSetTarget(entranceY, 0)
                springSetTarget(entranceOpacity, 1)
                wakeLoop()
              }, delay)
              observer?.unobserve(el)
            }
          },
          { threshold: 0.1 }
        )
        observer.observe(el)
      }
    }

    cleanupRef.current = () => {
      ids.forEach((id) => unregisterSpring(id))
      if (onPointerMove) el.removeEventListener('pointermove', onPointerMove)
      if (onPointerLeave) el.removeEventListener('pointerleave', onPointerLeave)
      observer?.disconnect()
      el.style.transform = ''
      el.style.opacity = ''
    }

    return () => { cleanupRef.current?.() }
  }, [ref, options.hover?.scale, options.hover?.tiltDeg, options.magnetic?.strength, options.entrance?.translateY, options.entrance?.delay])
}
