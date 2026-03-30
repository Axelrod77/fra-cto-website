'use client'

import { useRef } from 'react'
import { useSpringTransform } from '@/hooks/use-spring-transform'
import { Button, type ButtonProps } from '@/components/ui/button'

interface SpringButtonProps extends ButtonProps {
  entrance?: boolean
  entranceDelay?: number
}

export function SpringButton({ entrance = false, entranceDelay = 0, className = '', ...props }: SpringButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useSpringTransform(ref as React.RefObject<HTMLElement>, {
    hover: { scale: 1.04 },
    entrance: entrance ? { translateY: 16, delay: entranceDelay } : undefined,
  })

  return (
    <Button ref={ref} className={`will-change-transform ${className}`} {...props} />
  )
}
