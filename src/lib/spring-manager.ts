// Singleton RAF loop for all spring animations
// Batched DOM reads/writes, auto-starts/stops, zero idle cost

import { type SpringState, springStep, springIsSettled, springSnapToTarget } from './spring'

type SpringCallback = (spring: SpringState) => void

interface ManagedSpring {
  state: SpringState
  onUpdate: SpringCallback
  visible: boolean // controlled by IntersectionObserver
}

const springs = new Map<string, ManagedSpring>()
let rafId: number | null = null
let lastTime: number | null = null
let reducedMotion = false

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = mq.matches
  mq.addEventListener('change', (e) => { reducedMotion = e.matches })
}

export function registerSpring(
  id: string,
  state: SpringState,
  onUpdate: SpringCallback
): void {
  springs.set(id, { state, onUpdate, visible: true })
  if (reducedMotion) {
    springSnapToTarget(state)
    onUpdate(state)
  } else {
    startLoop()
  }
}

export function unregisterSpring(id: string): void {
  springs.delete(id)
  if (springs.size === 0) stopLoop()
}

export function setSpringVisibility(id: string, visible: boolean): void {
  const entry = springs.get(id)
  if (entry) entry.visible = visible
}

export function isReducedMotion(): boolean {
  return reducedMotion
}

function tick(now: number): void {
  rafId = null

  if (lastTime === null) {
    lastTime = now
    startLoop()
    return
  }

  // Cap dt to avoid spiral of death after tab suspension
  const dt = Math.min((now - lastTime) / 1000, 0.064)
  lastTime = now

  let anyActive = false

  // Single pass: step + write (safe because each spring owns its own element)
  springs.forEach((entry) => {
    const { state, onUpdate, visible } = entry
    if (!visible || springIsSettled(state)) return

    springStep(state, dt)

    if (springIsSettled(state)) {
      springSnapToTarget(state)
    } else {
      anyActive = true
    }

    onUpdate(state)
  })

  if (anyActive) startLoop()
}

function startLoop(): void {
  if (rafId !== null) return
  rafId = requestAnimationFrame(tick)
}

function stopLoop(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lastTime = null
}
