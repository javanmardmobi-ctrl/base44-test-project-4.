import { useEffect, useRef, useState } from 'react'

/**
 * A gold ring that follows the pointer and expands into a "View" label while a
 * property card is hovered. Disabled for touch and reduced-motion environments.
 */
export function ViewCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    setEnabled(query.matches && !reduced.matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    let x = 0
    let y = 0

    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      const target = event.target
      const overCard =
        target instanceof Element && Boolean(target.closest('[data-cursor="view"]'))

      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const ring = ringRef.current
        if (ring) {
          ring.style.transform = `translate3d(${x - 36}px, ${y - 36}px, 0)`
        }
        setActive(overCard)
      })
    }

    const leave = () => setActive(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseout', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseout', leave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[72px] w-[72px] will-change-transform"
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-full border border-gold/80 bg-navy-deep/25 backdrop-blur-[2px] transition-all duration-300 ease-premium ${
          active ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white">
          View
        </span>
      </div>
    </div>
  )
}
