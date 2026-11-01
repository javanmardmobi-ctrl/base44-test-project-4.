import { useCallback, useEffect, useRef, useState } from 'react'
import { properties, type Property } from '../../data/properties'
import { CarouselControls } from '../ui/CarouselControls'
import { PropertyCard } from '../ui/PropertyCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type FeaturedPropertiesProps = {
  onOpenProperty: (property: Property) => void
}

export function FeaturedProperties({ onOpenProperty }: FeaturedPropertiesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const syncBounds = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    setCanPrev(scroller.scrollLeft > 8)
    setCanNext(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    syncBounds()
    scroller.addEventListener('scroll', syncBounds, { passive: true })
    window.addEventListener('resize', syncBounds)

    return () => {
      scroller.removeEventListener('scroll', syncBounds)
      window.removeEventListener('resize', syncBounds)
    }
  }, [syncBounds])

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.72),
      behavior: 'smooth',
    })
  }

  const controls = (
    <CarouselControls
      label="Featured properties"
      onPrev={() => scrollByPage(-1)}
      onNext={() => scrollByPage(1)}
      canPrev={canPrev}
      canNext={canNext}
    />
  )

  return (
    <section id="properties" className="bg-white pb-20 pt-16 sm:pb-24 lg:pb-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured"
          title="Featured Properties"
          description="Explore a curated collection of exceptional properties in the most desirable locations."
          actions={<div className="hidden md:block">{controls}</div>}
        />
      </div>

      <Reveal className="mt-12 lg:mt-14" delay={80}>
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured properties"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-4 sm:scroll-pl-8 sm:gap-6 sm:px-8 lg:scroll-pl-10 lg:px-10"
        >
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`h-[380px] flex-none snap-start sm:h-[440px] lg:h-[500px] ${
                index === 0
                  ? 'w-[86%] sm:w-[72%] lg:w-[38%]'
                  : 'w-[70%] sm:w-[46%] lg:w-[19.5%]'
              }`}
            >
              <PropertyCard
                property={property}
                featured={index === 0}
                onOpen={onOpenProperty}
              />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="shell mt-8 flex items-center justify-between gap-4">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted/80">
          {properties.length} residences in the collection
        </p>
        <div className="md:hidden">{controls}</div>
      </div>
    </section>
  )
}
