import { useState } from 'react'
import { ArrowRight, MoveRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const images = [
  {
    src: '/images/about-villa-exterior.jpg',
    alt: 'Contemporary two storey villa with an infinity pool and landscaped terrace',
  },
  {
    src: '/images/about-living-room.jpg',
    alt: 'Warm minimalist living room with oak panelling and floor to ceiling windows',
  },
  {
    src: '/images/about-pool-terrace.jpg',
    alt: 'View from a modern interior out across a private pool terrace',
  },
]

export function About() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((current) => (current + 1) % images.length)
  const peek = images[(index + 1) % images.length]

  return (
    <section id="about" className="relative bg-white py-20 sm:py-24 lg:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[2.9rem]">
            Who We Are
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            From a first private viewing to the final signature, a single advisor guides you
            through valuation, negotiation and completion — quietly, precisely and always in
            your interest.
          </p>

          <a href="#services" className="btn-navy group mt-9">
            Learn More
            <MoveRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative mr-0 md:mr-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-mist shadow-soft">
              {images.map((image, i) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-premium ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={next}
                aria-label="Show the next photograph of our work"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-disc transition-all duration-300 ease-premium hover:scale-105 hover:bg-navy hover:text-white sm:right-6"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="absolute -bottom-10 right-0 hidden w-[38%] overflow-hidden rounded-[22px] border-[6px] border-white shadow-card md:block">
              <div className="relative aspect-[3/4] bg-mist">
                <img
                  key={peek.src}
                  src={peek.src}
                  alt={peek.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 md:mr-10" aria-hidden="true">
            {images.map((image, i) => (
              <span
                key={image.src}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? 'w-10 bg-gold' : 'w-4 bg-line'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
