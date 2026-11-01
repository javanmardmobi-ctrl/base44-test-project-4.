import { useRef, type MouseEvent } from 'react'
import { ArrowRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import type { Property } from '../../data/properties'

type PropertyCardProps = {
  property: Property
  featured?: boolean
  onOpen: (property: Property) => void
}

export function PropertyCard({ property, featured = false, onOpen }: PropertyCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)

  // Subtle 3D tilt that follows the pointer, written straight to the element so the
  // card never re-renders while the pointer moves.
  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`)
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <button
      ref={cardRef}
      type="button"
      data-cursor="view"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onClick={() => onOpen(property)}
      aria-label={`${property.name} in ${property.location}, ${property.price}. Open property details.`}
      style={{
        transform:
          'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translate3d(0, var(--lift, 0px), 0)',
      }}
      className="group relative block h-full w-full overflow-hidden rounded-[24px] bg-navy-deep text-left shadow-[0_24px_60px_-45px_rgba(9,47,87,0.95)] transition-[transform,box-shadow] duration-300 ease-premium will-change-transform hover:[--lift:-6px] hover:shadow-card"
    >
      <img
        src={property.image}
        alt={property.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.07]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-navy-deep/5 opacity-95" />

      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-navy-deep/40 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {property.type}
      </span>

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
        <span
          className={`font-semibold leading-snug text-white ${
            featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}
        >
          {property.name}
        </span>
        <span className="flex items-center gap-1.5 text-[0.78rem] text-white/75">
          <MapPin size={13} aria-hidden="true" className="shrink-0 text-gold" />
          <span className="truncate">{property.location}</span>
        </span>
        <span
          className={`mt-1 font-semibold text-gold transition-all duration-500 ease-premium ${
            featured ? 'text-lg' : 'text-sm'
          } group-hover:-translate-y-0.5`}
        >
          {property.price}
        </span>

        <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/15 pt-3 text-[0.68rem] font-medium text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble size={13} aria-hidden="true" className="text-white/50" />
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath size={13} aria-hidden="true" className="text-white/50" />
            {property.baths} Baths
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler size={13} aria-hidden="true" className="text-white/50" />
            {property.area}
          </span>
        </span>

        <span className="mt-1.5 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors duration-300 group-hover:text-gold">
          View Property
          <ArrowRight
            size={13}
            aria-hidden="true"
            className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
          />
        </span>
      </span>
    </button>
  )
}
