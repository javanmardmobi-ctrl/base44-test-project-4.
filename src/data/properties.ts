export type Property = {
  id: string
  name: string
  location: string
  price: string
  type: string
  image: string
  alt: string
  beds: number
  baths: number
  area: string
  description: string
}

/** Photography is stored in `public/images` so every card loads from the app itself. */
export const properties: Property[] = [
  {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    price: '$2.35 Million',
    type: 'Luxury Villa',
    image: '/images/property-lakeside-modern-villa.jpg',
    alt: 'Modern lakeside villa glowing at dusk with a reflecting pool',
    beds: 5,
    baths: 4,
    area: '6,200 sq ft',
    description:
      'A cantilevered glass volume over Lake Austin, framed by limestone and warm oak. Floor-to-ceiling glazing opens the living space to an infinity edge pool and a private boat dock.',
  },
  {
    id: 'contemporary-luxury-estate',
    name: 'Contemporary Luxury Estate',
    location: 'Los Angeles, California',
    price: '$3.80 Million',
    type: 'Modern House',
    image: '/images/property-contemporary-luxury-estate.jpg',
    alt: 'Contemporary two storey estate with landscaped gardens',
    beds: 6,
    baths: 5,
    area: '8,400 sq ft',
    description:
      'Set behind private gates in the hills, this estate pairs a double-height gallery with a resort garden, spa terrace and a cinema wing lit entirely by natural light.',
  },
  {
    id: 'minimalist-modern-residence',
    name: 'Minimalist Modern Residence',
    location: 'Miami, Florida, USA',
    price: '$1.95 Million',
    type: 'Apartment',
    image: '/images/property-minimalist-modern-residence.jpg',
    alt: 'Minimalist white residence with clean geometric lines',
    beds: 3,
    baths: 3,
    area: '3,100 sq ft',
    description:
      'A gallery-like residence on Biscayne Bay with white terrazzo floors, integrated joinery and a wraparound terrace facing the water.',
  },
  {
    id: 'exclusive-glass-villa',
    name: 'Exclusive Glass Villa',
    location: 'Beverly Hills, California',
    price: '$4.25 Million',
    type: 'Luxury Villa',
    image: '/images/property-exclusive-glass-villa.jpg',
    alt: 'Glass villa with a dark metal facade and pool at blue hour',
    beds: 5,
    baths: 6,
    area: '7,050 sq ft',
    description:
      'A structural glass pavilion above the canyon, where every principal room frames the city skyline and an illuminated pool mirrors the dusk.',
  },
  {
    id: 'modern-family-residence',
    name: 'Modern Family Residence',
    location: 'Dallas, Texas, USA',
    price: '$1.65 Million',
    type: 'Modern House',
    image: '/images/property-modern-family-residence.jpg',
    alt: 'Modern family home with timber cladding, a pool and a lawn',
    beds: 4,
    baths: 3,
    area: '4,300 sq ft',
    description:
      'Warm materials and a calm plan: an open kitchen at the centre, a shaded loggia for evenings outside and a separate studio over the garage.',
  },
]

export const propertyTypes = [
  'Luxury Villa',
  'Modern House',
  'Apartment',
  'Investment Property',
] as const
