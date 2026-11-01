import { MapPin } from 'lucide-react'
import type { Property } from '../../data/properties'

type PropertyCardProps = {
  property: Property
  featured?: boolean
  onOpen: (property: Property) => void
}

export function PropertyCard({ property, featured = false, onOpen }: PropertyCardProps) {
  return (
    <button
      type="button"
      data-cursor="view"
      onClick={() => onOpen(property)}
      aria-label={`${property.name} in ${property.location}, ${property.price}. Open property details.`}
      className="group relative block h-full w-full overflow-hidden rounded-[24px] bg-navy-deep text-left shadow-[0_24px_60px_-45px_rgba(9,47,87,0.95)] transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card"
    >
      <img
        src={property.image}
        alt={property.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.07]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/5 opacity-95" />

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
      </span>
    </button>
  )
}
