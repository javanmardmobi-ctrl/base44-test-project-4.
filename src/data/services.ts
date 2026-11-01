export type Service = {
  id: string
  title: string
  description: string
  icon: 'home' | 'trending' | 'consult' | 'key'
}

export const services: Service[] = [
  {
    id: 'luxury-property-sales',
    title: 'Luxury Property Sales',
    description:
      'Discreet representation for buyers and sellers of architecturally significant homes, from first viewing to final signature.',
    icon: 'home',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    description:
      'Market analysis, yield modelling and portfolio structuring for investors who value long-term, low-risk appreciation.',
    icon: 'trending',
  },
  {
    id: 'real-estate-consulting',
    title: 'Real Estate Consulting',
    description:
      'Independent advice on acquisition, development potential and design value, grounded in fifteen years of transactions.',
    icon: 'consult',
  },
  {
    id: 'property-management',
    title: 'Property Management',
    description:
      'Full-service stewardship — maintenance, tenant relations and reporting — so your asset performs while you are away.',
    icon: 'key',
  },
]

export const stats = [
  { id: 'experience', value: 15, suffix: '+', label: 'Years of Experience' },
  { id: 'sold', value: 250, suffix: '+', label: 'Properties Sold' },
  { id: 'clients', value: 180, suffix: '+', label: 'Happy Clients' },
  { id: 'agents', value: 25, suffix: '+', label: 'Expert Agents' },
]

export const testimonials = [
  {
    id: 'sarah-lindqvist',
    name: 'Sarah Lindqvist',
    role: 'Villa purchase, Austin',
    rating: 5,
    avatar: '/images/testimonial-sarah-lindqvist.jpg',
    quote:
      'Horizon found a house that was never publicly listed and negotiated it with real finesse. Every step felt considered, never hurried.',
  },
  {
    id: 'james-park',
    name: 'James Park',
    role: 'Investment portfolio, Miami',
    rating: 5,
    avatar: '/images/testimonial-james-park.jpg',
    quote:
      'Their yield modelling was more rigorous than the two advisory firms I had used before. Three acquisitions in, the numbers have held up.',
  },
  {
    id: 'amelia-carter',
    name: 'Amelia Carter',
    role: 'Estate sale, Beverly Hills',
    rating: 5,
    avatar: '/images/testimonial-amelia-carter.jpg',
    quote:
      'From photography to the final negotiation, the presentation of our home was extraordinary. It sold above asking in eleven days.',
  },
]
