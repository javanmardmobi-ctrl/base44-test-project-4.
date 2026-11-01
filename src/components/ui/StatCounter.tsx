import { useEffect, useRef, useState } from 'react'

type StatCounterProps = {
  value: number
  suffix: string
}

/** Counts up to its value the first time it scrolls into view. */
export function StatCounter({ value, suffix }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplay(value)
      return
    }

    let frame = 0
    let started = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return
        started = true
        observer.disconnect()

        const duration = 1400
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) {
            frame = requestAnimationFrame(tick)
          }
        }

        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref}>
      {display}
      <span className="text-gold">{suffix}</span>
    </span>
  )
}
