import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        open
          ? 'bg-navy-deep shadow-[0_20px_50px_-35px_rgba(6,39,72,0.95)]'
          : scrolled
            ? 'bg-navy-deep/95 shadow-[0_20px_50px_-35px_rgba(6,39,72,0.95)] backdrop-blur-md'
            : 'bg-gradient-to-b from-navy-deep/60 to-transparent'
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
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white transition-colors duration-300 hover:border-gold hover:text-gold lg:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="lg:hidden"
      >
        <div className="shell flex max-h-[calc(100svh-76px)] flex-col gap-1 overflow-y-auto pb-10 pt-4">
          {navigation.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline justify-between border-b border-white/10 py-4 text-xl font-semibold transition-colors duration-300 ${
                active === item.id ? 'text-gold' : 'text-white hover:text-gold'
              }`}
            >
              {item.label}
              <span className="text-[0.65rem] font-medium tracking-[0.2em] text-white/40">
                {String(index + 1).padStart(2, '0')}
              </span>
            </a>
          ))}

          <a
            href={contactDetails.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Phone size={15} aria-hidden="true" />
            {contactDetails.phone}
          </a>
        </div>
      </div>
    </header>
  )
}
