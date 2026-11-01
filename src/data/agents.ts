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
    image: '/images/agent-elena-vasquez.jpg',
    email: 'elena@horizonproperties.com',
    phone: '+15552467890',
  },
  {
    id: 'marcus-hale',
    name: 'Marcus Hale',
    role: 'Director of Sales',
    image: '/images/agent-marcus-hale.jpg',
    email: 'marcus@horizonproperties.com',
    phone: '+15552467891',
  },
  {
    id: 'priya-raman',
    name: 'Priya Raman',
    role: 'Investment Advisor',
    image: '/images/agent-priya-raman.jpg',
    email: 'priya@horizonproperties.com',
    phone: '+15552467892',
  },
  {
    id: 'daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Head of Property Management',
    image: '/images/agent-daniel-okafor.jpg',
    email: 'daniel@horizonproperties.com',
    phone: '+15552467893',
  },
]
