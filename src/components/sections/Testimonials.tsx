import { useState } from 'react'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/services'
import { CarouselControls } from '../ui/CarouselControls'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const current = testimonials[index]

  if (!current) return null

  const prev = () => setIndex((value) => (value - 1 + total) % total)
  const next = () => setIndex((value) => (value + 1) % total)

  return (
    <section id="testimonials" className="bg-mist py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Quiet negotiations, well-kept promises and numbers that hold up after the keys change hands."
          align="center"
        />

        <Reveal className="mt-12 lg:mt-16" delay={80}>
          <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-soft sm:p-12">
            <div className="flex items-center justify-between gap-4">
              <Quote size={34} aria-hidden="true" className="text-gold/70" />
              <div
                className="flex items-center gap-1"
                role="img"
                aria-label={`Rated ${current.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={15}
                    aria-hidden="true"
                    className={starIndex < current.rating ? 'text-gold' : 'text-line'}
                    fill={starIndex < current.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>

            <div aria-live="polite">
              <blockquote className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
                “{current.quote}”
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={`Portrait of ${current.name}`}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-navy">{current.name}</p>
                  <p className="text-[0.8rem] text-muted">{current.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex items-center justify-between border-t border-line pt-6">
              <CarouselControls
                label="Client testimonials"
                onPrev={prev}
                onNext={next}
                canPrev
                canNext
              />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted/80">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
