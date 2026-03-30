'use client'

import { useEffect, useState, useRef } from 'react'
import { createSpring, springSetTarget } from '@/lib/spring'
import { registerSpring, unregisterSpring, isReducedMotion, wakeLoop } from '@/lib/spring-manager'

const LOADER_KEY = 'fracto-loader-shown'

export function Loader() {
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip if already shown this session
    if (typeof window !== 'undefined' && sessionStorage.getItem(LOADER_KEY)) {
      setVisible(false)
      setDismissed(true)
      return
    }

    const reduced = isReducedMotion()
    const duration = reduced ? 0 : (window.matchMedia('(pointer: fine)').matches ? 800 : 500)

    const timer = setTimeout(() => {
      if (reduced || !overlayRef.current) {
        setVisible(false)
        setDismissed(true)
        sessionStorage.setItem(LOADER_KEY, '1')
        return
      }

      const opacity = createSpring(1, { stiffness: 120, damping: 20 })
      const id = 'loader-opacity'
      registerSpring(id, opacity, (s) => {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = `${s.pos}`
        }
        if (s.pos < 0.01) {
          setVisible(false)
          setDismissed(true)
          unregisterSpring(id)
          sessionStorage.setItem(LOADER_KEY, '1')
        }
      })
      springSetTarget(opacity, 0)
      wakeLoop()
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-navy)] ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden="true"
    >
      {/* Logo mark */}
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
        <rect width="100" height="100" rx="20" fill="var(--color-teal)" fillOpacity="0.15" />
        <text x="50" y="62" textAnchor="middle" fill="var(--color-teal)" fontSize="40" fontWeight="700" fontFamily="system-ui, sans-serif">
          F
        </text>
      </svg>
      {/* Blinking cursor text */}
      <div className="font-mono text-sm text-[var(--color-teal)] tracking-wider">
        initializing
        <span className="animate-pulse">_</span>
      </div>
    </div>
  )
}
