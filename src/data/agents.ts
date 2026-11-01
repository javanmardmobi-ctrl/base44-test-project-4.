export type Agent = {
  id: string
  name: string
  role: string
  image: string
  email: string
  phone: string
}

export const agents: Agent[] = [
  {
    id: 'elena-vasquez',
    name: 'Elena Vásquez',
    role: 'Principal Broker',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    email: 'elena@horizonproperties.com',
    phone: '+15552467890',
  },
  {
    id: 'marcus-hale',
    name: 'Marcus Hale',
    role: 'Director of Sales',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    email: 'marcus@horizonproperties.com',
    phone: '+15552467891',
  },
  {
    id: 'priya-raman',
    name: 'Priya Raman',
    role: 'Investment Advisor',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    email: 'priya@horizonproperties.com',
    phone: '+15552467892',
  },
  {
    id: 'daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Head of Property Management',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    email: 'daniel@horizonproperties.com',
    phone: '+15552467893',
  },
]
