import { useCallback, useEffect, useRef, useState } from 'react'
import { useScrollVideo } from '../../hooks/useScrollVideo'
import { Preloader } from '../ui/Preloader'

const POSTER = '/media/villa-poster.jpg'
const DESKTOP_FILM = '/media/villa-scroll.mp4'
const MOBILE_FILM = '/media/villa-scroll-mobile.mp4'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/** Smoothstep, so every text layer eases in and out instead of fading linearly. */
const ease = (start: number, end: number, value: number) => {
  const x = clamp01((value - start) / (end - start))
  return x * x * (3 - 2 * x)
}

const CHAPTERS = [
  {
    number: '01',
    title: 'Arrival',
    copy: 'A private approach, held between water, stone and quiet light.',
  },
  {
    number: '02',
    title: 'Threshold',
    copy: 'Glass dissolves the line where the garden becomes the house.',
  },
  {
    number: '03',
    title: 'Within',
    copy: 'Warm oak, composed volumes and a horizon in every room.',
  },
]

/** [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] per chapter, in scroll progress. */
const CHAPTER_RANGES: Array<[number, number, number, number]> = [
  [0.3, 0.4, 0.5, 0.6],
  [0.6, 0.69, 0.77, 0.85],
  [0.84, 0.91, 0.98, 1.04],
]

/**
 * Full-screen cinematic hero. The uploaded villa film is never played: the page
 * scrolls through a long pinned section and the film's `currentTime` follows that
 * scroll, so scrolling down travels into the villa and scrolling up reverses it.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([])

  const [reducedMotion, setReducedMotion] = useState(false)
  const [film] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches
      ? MOBILE_FILM
      : DESKTOP_FILM,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const handleFrame = useCallback((progress: number) => {
    const headline = headlineRef.current
    if (headline) {
      const exit = ease(0.02, 0.2, progress)
      headline.style.opacity = String(1 - exit)
      headline.style.transform = `translate3d(0, ${(-exit * 56).toFixed(2)}px, 0)`
    }

    if (cueRef.current) {
      cueRef.current.style.opacity = String(1 - ease(0, 0.05, progress))
    }

    chapterRefs.current.forEach((node, index) => {
      const range = CHAPTER_RANGES[index]
      if (!node || !range) return

      const enter = ease(range[0], range[1], progress)
      const exit = ease(range[2], range[3], progress)
      node.style.opacity = (enter * (1 - exit)).toFixed(3)
      node.style.transform = `translate3d(0, ${((1 - enter) * 44 - exit * 44).toFixed(2)}px, 0)`
    })

    if (veilRef.current) {
      veilRef.current.style.opacity = (ease(0.88, 1, progress) * 0.94).toFixed(3)
    }

    if (railRef.current) {
      railRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
    }

    if (videoRef.current) {
      videoRef.current.style.transform = `scale(${(1.06 - progress * 0.05).toFixed(4)})`
    }
  }, [])

  const { status, buffered } = useScrollVideo({
    sectionRef,
    videoRef,
    onFrame: handleFrame,
    enabled: !reducedMotion,
  })

  return (
    <>
      {!reducedMotion && <Preloader visible={status === 'loading'} progress={buffered} />}

      <section
        id="home"
        ref={sectionRef}
        className={`relative isolate bg-navy-deep ${reducedMotion ? '' : 'h-[460vh] lg:h-[520vh]'}`}
      >
        <div
          className={`${reducedMotion ? 'relative' : 'sticky top-0'} h-[100svh] w-full overflow-hidden`}
        >
          {reducedMotion ? (
            <img
              src={POSTER}
              alt="Luxury modern villa with full-height glazing opening onto a terrace"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={film}
              poster={POSTER}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover will-change-transform"
              style={{ transform: 'scale(1.06)' }}
            />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,39,72,0.88)_0%,rgba(6,39,72,0.34)_38%,rgba(6,39,72,0.52)_70%,rgba(6,39,72,0.95)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:radial-gradient(115%_80%_at_50%_42%,transparent_38%,rgba(6,39,72,0.55)_100%)]"
          />

          <div className="relative z-10 flex h-full items-center justify-center px-5 text-center sm:px-8">
            <div ref={headlineRef} className="max-w-4xl will-change-transform">
              <p className="eyebrow text-gold">The Horizon Collection · 2026</p>
              <h1 className="mt-5 font-display text-[1.95rem] font-semibold uppercase leading-[1.16] tracking-[0.05em] text-white sm:mt-6 sm:text-[2.85rem] sm:tracking-[0.07em] lg:text-[4.1rem] lg:leading-[1.1]">
                Discover Exceptional
                <br className="hidden sm:block" /> Homes &amp; Investments
              </h1>
              <span aria-hidden="true" className="mx-auto mt-7 block h-px w-20 bg-gold/60" />
              <p className="mx-auto mt-6 max-w-[44ch] text-[0.76rem] font-medium uppercase tracking-[0.22em] text-white/75 sm:mt-7 sm:text-[0.85rem] sm:tracking-[0.3em]">
                Experience Luxury. Discover Your Dream Home.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          >
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.title}
                ref={(node) => {
                  chapterRefs.current[index] = node
                }}
                className="absolute inset-x-6 mx-auto max-w-[34rem] text-center opacity-0 will-change-transform"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-gold">
                  {chapter.number} — {chapter.title}
                </p>
                <p className="mt-5 font-display text-xl font-medium leading-snug text-white sm:text-2xl lg:text-[1.95rem]">
                  {chapter.copy}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={veilRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-navy-deep opacity-0"
          />

          <div ref={cueRef} className="absolute inset-x-0 bottom-10 z-30 flex justify-center">
            <a
              href="#properties"
              className="group inline-flex flex-col items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/65 transition-colors duration-300 hover:text-gold"
            >
              Scroll to enter
              <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/25">
                <span className="absolute inset-x-0 top-0 block h-4 animate-scroll-cue bg-gold" />
              </span>
            </a>
          </div>

          {!reducedMotion && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15"
            >
              <span
                ref={railRef}
                className="block h-full origin-left bg-gold/80"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
