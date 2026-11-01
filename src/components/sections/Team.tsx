import { Linkedin, Mail, Phone } from 'lucide-react'
import { agents } from '../../data/agents'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Team() {
  return (
    <section id="team" className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Team"
          title="Meet the Advisors"
          description="A small, senior team — you work with the person who knows your brief, from the first visit to the keys."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {agents.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 90}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-mist">
                  <img
                    src={agent.image}
                    alt={`Portrait of ${agent.name}, ${agent.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 bg-gradient-to-t from-navy-deep/85 to-transparent p-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
                    <a
                      href={`mailto:${agent.email}`}
                      aria-label={`Email ${agent.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy transition-colors duration-300 hover:bg-gold hover:text-navy"
                    >
                      <Mail size={15} aria-hidden="true" />
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      aria-label={`Call ${agent.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy transition-colors duration-300 hover:bg-gold hover:text-navy"
                    >
                      <Phone size={15} aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${agent.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy transition-colors duration-300 hover:bg-gold hover:text-navy"
                    >
                      <Linkedin size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{agent.name}</h3>
                <p className="mt-1 text-sm text-muted">{agent.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
