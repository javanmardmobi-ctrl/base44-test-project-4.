import { ArrowRight, KeyRound } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

export function CtaBanner() {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-24 lg:pb-28">
      <div className="shell">
        <Reveal>
          <div className="relative rounded-[30px] bg-mist px-6 pb-9 pt-14 sm:px-10 sm:pb-11 sm:pt-12 lg:px-12">
            <span className="absolute -top-8 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-gold shadow-disc sm:left-10">
              <KeyRound size={24} aria-hidden="true" />
            </span>

            <div className="flex flex-col gap-7 sm:pl-24 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div>
                <h2 className="text-2xl font-bold text-navy sm:text-[1.7rem]">
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>

              <a href="#contact" className="btn-navy group shrink-0 self-start lg:self-center">
                Get In Touch
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
