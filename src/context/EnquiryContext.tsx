import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type EnquiryContextValue = {
  /** Property interest the visitor selected from a card or service. */
  interest: string
  requestEnquiry: (interest: string) => void
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState('')

  const requestEnquiry = useCallback((value: string) => {
    setInterest(value)
    const contact = document.getElementById('contact')
    contact?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const value = useMemo(() => ({ interest, requestEnquiry }), [interest, requestEnquiry])

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider')
  }
  return context
}
