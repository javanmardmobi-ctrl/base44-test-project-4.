import { stats } from '../../data/services'
import { Reveal } from '../ui/Reveal'
import { StatCounter } from '../ui/StatCounter'

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy-deep py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-navy-soft/40 blur-3xl"
      />
      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
            Fifteen Years of Getting the Details Right
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Our advisors have closed transactions in twelve markets and every one of them
            began with a conversation rather than a listing. That is why clients return, and
            why they refer the people they care about.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10">
            {stats.map((stat) => (
              <div key={stat.id} className="border-l border-white/15 pl-5 sm:pl-6">
                <dd className="text-4xl font-bold leading-none text-white sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-white/60">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
