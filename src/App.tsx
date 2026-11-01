import { useCallback, useState } from 'react'
import { EnquiryProvider } from './context/EnquiryContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { FeaturedProperties } from './components/sections/FeaturedProperties'
import { CtaBanner } from './components/sections/CtaBanner'
import { Services } from './components/sections/Services'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { Team } from './components/sections/Team'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { PropertyDialog } from './components/ui/PropertyDialog'
import { LegalDialog } from './components/ui/LegalDialog'
import { ViewCursor } from './components/ui/ViewCursor'
import type { Property } from './data/properties'
import type { LegalKind } from './data/legal'

export default function App() {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null)
  const [legal, setLegal] = useState<LegalKind | null>(null)

  const closeProperty = useCallback(() => setActiveProperty(null), [])
  const closeLegal = useCallback(() => setLegal(null), [])

  return (
    <EnquiryProvider>
      <ViewCursor />
      <Header />

      <main>
        <Hero />
        <About />
        <FeaturedProperties onOpenProperty={setActiveProperty} />
        <CtaBanner />
        <Services />
        <WhyChooseUs />
        <Team />
        <Testimonials />
        <Contact />
      </main>

      <Footer onOpenLegal={setLegal} />

      <PropertyDialog property={activeProperty} onClose={closeProperty} />
      <LegalDialog kind={legal} onClose={closeLegal} />
    </EnquiryProvider>
  )
}
