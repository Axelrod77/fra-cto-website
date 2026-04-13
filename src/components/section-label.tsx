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
    <span className={`text-xs uppercase tracking-[0.24em] font-mono font-bold ${colorClass} ${className}`}>
      {text}
    </span>
  )
}
