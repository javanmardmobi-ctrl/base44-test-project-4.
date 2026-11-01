export const contactDetails = {
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  emailHref: 'mailto:hello@horizonproperties.com',
  address: ['Horizon House, 41 Crescent Avenue', 'Austin, Texas 78701, USA'],
  hours: 'Monday – Friday, 9:00 – 18:00',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=41+Crescent+Avenue+Austin+Texas',
}

export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { id: 'x', label: 'X', href: 'https://x.com/' },
]

export const navigation = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Properties', href: '#properties', id: 'properties' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Team', href: '#team', id: 'team' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const sectionIds = navigation.map((item) => item.id)

export const footerCategories = [
  'Luxury Villas',
  'Modern Houses',
  'Apartments',
  'Investment Properties',
]
