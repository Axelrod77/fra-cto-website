'use client'

import { useRef } from 'react'
import { useSpringTransform } from '@/hooks/use-spring-transform'

interface SpringCardProps {
  children: React.ReactNode
  tilt?: boolean
  magnetic?: boolean
  entrance?: boolean
  entranceDelay?: number
  className?: string
}

export function SpringCard({
  children,
  tilt = true,
  magnetic = true,
  entrance = true,
  entranceDelay = 0,
  className = '',
}: SpringCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useSpringTransform(ref, {
    hover: tilt ? { scale: 1.02, tiltDeg: 2, liftPx: 8 } : { scale: 1.02 },
    magnetic: magnetic ? { strength: 3 } : undefined,
    entrance: entrance ? { translateY: 24, delay: entranceDelay } : undefined,
  })

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
