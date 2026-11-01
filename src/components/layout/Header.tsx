import { useEffect, useState, type MouseEvent } from 'react'
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { contactDetails, navigation, sectionIds } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Logo } from '../ui/Logo'

export function Header() {
  const scrolled = useScrolled(60)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Close the overlay first, then travel to the section once scrolling is free again.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          open
            ? 'bg-transparent'
            : scrolled
              ? 'border-b border-white/10 bg-navy-deep/80 shadow-[0_20px_50px_-35px_rgba(6,39,72,0.95)] backdrop-blur-xl'
              : 'bg-gradient-to-b from-navy-deep/70 to-transparent'
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-4 sm:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navigation.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-2 text-[0.82rem] font-medium tracking-[0.02em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ease-premium ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={contactDetails.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-white/45 px-5 py-2.5 text-[0.78rem] font-semibold tracking-wide text-white transition-all duration-300 ease-premium hover:border-gold hover:bg-white/10 hover:text-gold sm:inline-flex"
            >
              <Phone size={15} aria-hidden="true" />
              {contactDetails.phone}
            </a>
            <a
              href={contactDetails.phoneHref}
              aria-label={`Call ${contactDetails.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:hidden"
            >
              <Phone size={16} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white transition-colors duration-300 hover:border-gold hover:bg-white/10 hover:text-gold sm:h-11 sm:w-11"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-navy-deep/[0.97] backdrop-blur-xl transition-opacity duration-500 ease-premium ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex min-h-[100svh] flex-col justify-between gap-12 pb-12 pt-28 sm:pt-32">
          <nav aria-label="Site menu">
            <ul>
              {navigation.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    onClick={(event) => goTo(event, item.href)}
                    className={`group flex items-baseline justify-between gap-6 border-b border-white/10 py-5 text-[1.6rem] font-semibold uppercase tracking-[0.05em] transition-colors duration-300 sm:text-3xl ${
                      active === item.id ? 'text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    {item.label}
                    <span className="text-[0.62rem] font-medium tracking-[0.24em] text-white/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={contactDetails.phoneHref}
              tabIndex={open ? 0 : -1}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Phone size={15} aria-hidden="true" />
              {contactDetails.phone}
            </a>
          </nav>

          <div className="grid gap-8 text-sm text-white/65 sm:grid-cols-2">
            <div className="space-y-3">
              <a
                href={contactDetails.phoneHref}
                tabIndex={open ? 0 : -1}
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-gold"
              >
                <Phone size={14} aria-hidden="true" className="text-gold" />
                {contactDetails.phone}
              </a>
              <a
                href={contactDetails.emailHref}
                tabIndex={open ? 0 : -1}
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-gold"
              >
                <Mail size={14} aria-hidden="true" className="text-gold" />
                {contactDetails.email}
              </a>
            </div>
            <div className="space-y-3">
              <p className="flex items-start gap-2.5">
                <MapPin size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-gold" />
                <span>{contactDetails.address.join(', ')}</span>
              </p>
              <p className="pl-6 text-white/45">{contactDetails.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
