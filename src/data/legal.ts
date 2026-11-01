export type LegalKind = 'privacy' | 'terms'

export type LegalDocument = {
  title: string
  updated: string
  sections: { heading: string; body: string }[]
}

export const legalDocuments: Record<LegalKind, LegalDocument> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated 1 November 2026',
    sections: [
      {
        heading: 'What we collect',
        body: 'When you send an enquiry we collect your name, email address, phone number, the property type you are interested in and your message. We also record standard technical information such as the time of the request.',
      },
      {
        heading: 'How we use it',
        body: 'Your details are used only to answer your enquiry and, if you ask us to, to send you matching properties. We do not sell or rent personal information to anyone.',
      },
      {
        heading: 'How long we keep it',
        body: 'Enquiries are kept for 24 months so that we can pick up a conversation where it left off. You can ask us to delete your enquiry at any time by emailing hello@horizonproperties.com.',
      },
      {
        heading: 'Your choices',
        body: 'You may request a copy of the information we hold, ask for corrections, or ask us to stop contacting you. We respond to every request within 30 days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated 1 November 2026',
    sections: [
      {
        heading: 'Property information',
        body: 'Listings, prices and measurements are provided in good faith and may change without notice. Prices are guide prices and do not form an offer or contract.',
      },
      {
        heading: 'Viewings and advice',
        body: 'Viewings are arranged by appointment. Any investment commentary on this site is general information, not personal financial advice.',
      },
      {
        heading: 'Use of this website',
        body: 'Photography, copy and design on this site belong to Horizon Properties and may not be reproduced without written permission.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms can be sent to hello@horizonproperties.com or raised by telephone on (555) 246-7890.',
      },
    ],
  },
}
