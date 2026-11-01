import { ArrowRight, Compass, Home, KeyRound, TrendingUp, type LucideIcon } from 'lucide-react'
import { services, type Service } from '../../data/services'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons: Record<Service['icon'], LucideIcon> = {
  home: Home,
  trending: TrendingUp,
  consult: Compass,
  key: KeyRound,
}

export function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Services"
          title="Considered Advice at Every Stage"
          description="Four disciplines, one standard of care — whether you are buying, selling, investing or entrusting us with a home."
          actions={
            <img
              src="/images/service-architectural-interior.jpg"
              alt="Concrete and oak dining space in a contemporary Horizon residence"
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover sm:h-44 sm:w-80 lg:h-48 lg:w-96"
            />
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            return (
              <Reveal key={service.id} delay={index * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-navy/15 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-navy transition-colors duration-500 ease-premium group-hover:bg-navy group-hover:text-gold">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-navy">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors duration-300 hover:text-gold"
                  >
                    Learn More
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
                    />
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
