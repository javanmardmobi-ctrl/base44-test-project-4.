import { ArrowLeft, ArrowRight } from 'lucide-react'

type CarouselControlsProps = {
  label: string
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  tone?: 'light' | 'dark'
  className?: string
}

export function CarouselControls({
  label,
  onPrev,
  onNext,
  canPrev,
  canNext,
  tone = 'light',
  className = '',
}: CarouselControlsProps) {
  const base =
    'flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-40'

  const styles =
    tone === 'dark'
      ? 'border-white/25 text-white hover:border-gold hover:bg-white/10 hover:text-gold'
      : 'border-line bg-white text-navy hover:border-navy hover:bg-navy hover:text-white'

  return (
    <div className={`flex items-center gap-3 ${className}`} role="group" aria-label={label}>
      <button
        type="button"
        className={`${base} ${styles}`}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label={`Previous ${label.toLowerCase()}`}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${base} ${styles}`}
        onClick={onNext}
        disabled={!canNext}
        aria-label={`Next ${label.toLowerCase()}`}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
