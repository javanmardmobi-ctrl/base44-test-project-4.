import { useState, type MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85'

export function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // "Parallax float": the photograph drifts gently against the pointer.
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window
    if (!innerWidth || !innerHeight) return
    setOffset({
      x: (event.clientX / innerWidth - 0.5) * -22,
      y: (event.clientY / innerHeight - 0.5) * -14,
    })
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-deep"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Contemporary villa with floor to ceiling glass and an infinity pool at blue hour"
          className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out will-change-transform"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-navy-deep/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/25 to-navy-deep/85" />
      </div>

      <div className="shell relative z-10 pb-32 pt-36 text-center sm:pb-28">
        <h1 className="mx-auto max-w-[20ch] text-[2.35rem] font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.1rem]">
          Discover Exceptional
          <br className="hidden sm:block" /> Homes &amp; Investments
        </h1>
        <p className="mx-auto mt-7 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg">
          Premium properties in prime locations. Find your dream home or the perfect
          investment with confidence.
        </p>

        <a
          href="#properties"
          className="group mx-auto mt-14 inline-flex flex-col items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors duration-300 hover:text-gold"
        >
          Explore the collection
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 transition-all duration-300 ease-premium group-hover:border-gold group-hover:translate-y-1">
            <ArrowDown size={16} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  )
}
