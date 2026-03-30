'use client'

import { useEffect, useRef, useSyncExternalStore, useCallback } from 'react'
import { createSpring, springSetTarget, springSnapToTarget, type SpringConfig, type SpringState } from '@/lib/spring'
import { registerSpring, unregisterSpring, isReducedMotion } from '@/lib/spring-manager'

let idCounter = 0
function nextId() { return `spring-${++idCounter}` }

export function useSpring(
  target: number,
  config?: Partial<SpringConfig>
): number {
  const idRef = useRef(nextId())
  const stateRef = useRef<SpringState | null>(null)
  const valueRef = useRef(target)
  const listenersRef = useRef(new Set<() => void>())

  if (stateRef.current === null) {
    stateRef.current = createSpring(target, config)
  }

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener)
    return () => { listenersRef.current.delete(listener) }
  }, [])

  const getSnapshot = useCallback(() => valueRef.current, [])

  useEffect(() => {
    const id = idRef.current
    const state = stateRef.current!

    registerSpring(id, state, (s) => {
      valueRef.current = s.pos
      listenersRef.current.forEach((l) => l())
    })

    return () => unregisterSpring(id)
  }, [])

  useEffect(() => {
    const state = stateRef.current!
    if (isReducedMotion()) {
      springSetTarget(state, target)
      springSnapToTarget(state)
      valueRef.current = target
      listenersRef.current.forEach((l) => l())
    } else {
      springSetTarget(state, target)
    }
  }, [target])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
