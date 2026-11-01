import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { footerCategories, navigation, socialLinks, contactDetails } from '../../data/site'
import type { LegalKind } from '../../data/legal'
import { Logo } from '../ui/Logo'

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  x: Twitter,
}

type FooterProps = {
  onOpenLegal: (kind: LegalKind) => void
}

export function Footer({ onOpenLegal }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-deep text-white">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Horizon Properties curates exceptional homes and considered investments in the
              world's most desirable locations.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id] ?? Linkedin
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Horizon Properties on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 ease-premium hover:border-gold hover:text-gold"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Property Categories
            </h2>
            <ul className="mt-5 space-y-3">
              {footerCategories.map((category) => (
                <li key={category}>
                  <a
                    href="#properties"
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={contactDetails.phoneHref}
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <Phone size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-gold" />
                  {contactDetails.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.emailHref}
                  className="flex items-start gap-2.5 break-all transition-colors duration-300 hover:text-white"
                >
                  <Mail size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-gold" />
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.mapHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    {contactDetails.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {year} Horizon Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="text-xs text-white/60 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="text-xs text-white/60 transition-colors duration-300 hover:text-white"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
