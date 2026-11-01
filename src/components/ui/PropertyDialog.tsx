import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import type { Property } from '../../data/properties'
import { useEnquiry } from '../../context/EnquiryContext'

type PropertyDialogProps = {
  property: Property | null
  onClose: () => void
}

export function PropertyDialog({ property, onClose }: PropertyDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const { requestEnquiry } = useEnquiry()

  useEffect(() => {
    if (!property) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [property, onClose])

  if (!property) return null

  const facts = [
    { icon: BedDouble, label: `${property.beds} bedrooms` },
    { icon: Bath, label: `${property.baths} bathrooms` },
    { icon: Ruler, label: property.area },
  ]

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close property details"
        onClick={onClose}
        className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-dialog-title"
        className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-white shadow-card sm:rounded-[28px]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:rounded-t-[28px]">
          <img src={property.image} alt={property.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close property details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy transition-colors duration-300 hover:bg-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="absolute inset-x-6 bottom-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-white">
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
              {property.type}
            </span>
            <span className="text-sm text-white/85">{property.price}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 id="property-dialog-title" className="text-2xl font-bold text-navy">
            {property.name}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} aria-hidden="true" className="text-gold" />
            {property.location}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-mist px-4 py-4 text-center">
            {facts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon size={18} aria-hidden="true" className="text-navy" />
                <span className="text-[0.72rem] font-medium text-muted">{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{property.description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                requestEnquiry(property.type)
                onClose()
              }}
              className="btn-navy group flex-1"
            >
              Enquire about this property
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button type="button" onClick={onClose} className="btn border border-line text-navy hover:bg-mist">
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
