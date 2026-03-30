interface SectionLabelProps {
  text: string
  color?: 'teal' | 'navy'
  className?: string
}

export function SectionLabel({ text, color = 'teal', className = '' }: SectionLabelProps) {
  const colorClass = color === 'teal'
    ? 'text-[var(--color-teal)]'
    : 'text-[var(--color-navy)]'

  return (
    <span className={`text-[10px] uppercase tracking-[0.2em] font-mono font-medium ${colorClass} ${className}`}>
      {text}
    </span>
  )
}
