import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { propertyTypes } from '../../data/properties'
import { contactDetails } from '../../data/site'
import { submitContact, type ContactField } from '../../lib/contact'
import { emptyContact, validateContact, type ContactErrors } from '../../lib/validation'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Status = 'idle' | 'submitting' | 'success' | 'error'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  )
}

export function Contact() {
  const { interest } = useEnquiry()
  const [values, setValues] = useState(emptyContact)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  // A property card or service can pre-select the interest and scroll here.
  useEffect(() => {
    if (!interest) return
    setValues((current) => ({ ...current, interest }))
    setErrors((current) => ({ ...current, interest: undefined }))
  }, [interest])

  const update =
    (field: ContactField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setValues((current) => ({ ...current, [field]: value }))
      setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
      if (status === 'error') {
        setStatus('idle')
        setFeedback('')
      }
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateContact(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback('Please check the highlighted fields and send again.')
      const firstInvalid = Object.keys(nextErrors)[0]
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    setFeedback('')

    const result = await submitContact(values)

    if (result.ok) {
      const firstName = values.name.trim().split(/\s+/)[0]
      setStatus('success')
      setFeedback(
        `Thank you, ${firstName}. Your enquiry is with our team — expect a reply within one business day.`,
      )
      setValues(emptyContact)
      setErrors({})
      return
    }

    setStatus('error')
    setErrors(result.errors ?? {})
    setFeedback(result.message)
  }

  const fieldClass = (field: ContactField) =>
    `field mt-2 ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`

  return (
    <section id="contact" className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Talk About Your Next Move"
            description="Tell us what you are looking for and one of our advisors will call you back with a shortlist."
          />

          <Reveal className="mt-10 space-y-4" delay={100}>
            <a
              href={contactDetails.phoneHref}
              className="group flex items-start gap-4 rounded-2xl border border-line p-4 transition-all duration-300 ease-premium hover:border-navy/20 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                <Phone size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted/80">
                  Phone
                </span>
                <span className="mt-1 block text-base font-semibold text-navy">
                  {contactDetails.phone}
                </span>
              </span>
            </a>

            <a
              href={contactDetails.emailHref}
              className="group flex items-start gap-4 rounded-2xl border border-line p-4 transition-all duration-300 ease-premium hover:border-navy/20 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                <Mail size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted/80">
                  Email
                </span>
                <span className="mt-1 block break-all text-base font-semibold text-navy">
                  {contactDetails.email}
                </span>
              </span>
            </a>

            <a
              href={contactDetails.mapHref}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start gap-4 rounded-2xl border border-line p-4 transition-all duration-300 ease-premium hover:border-navy/20 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted/80">
                  Office
                </span>
                <span className="mt-1 block text-base font-semibold text-navy">
                  {contactDetails.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-line p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                <Clock size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted/80">
                  Hours
                </span>
                <span className="mt-1 block text-base font-semibold text-navy">
                  {contactDetails.hours}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-label="Property enquiry form"
            className="rounded-[26px] border border-line bg-white p-6 shadow-soft sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Ellis"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={fieldClass('name')}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={fieldClass('email')}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={values.phone}
                  onChange={update('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  className={fieldClass('phone')}
                />
                <FieldError id="contact-phone-error" message={errors.phone} />
              </div>

              <div>
                <label
                  htmlFor="contact-interest"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Property Interest
                </label>
                <select
                  id="contact-interest"
                  name="interest"
                  value={values.interest}
                  onChange={update('interest')}
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={errors.interest ? 'contact-interest-error' : undefined}
                  className={`${fieldClass('interest')} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="">Select a property type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FieldError id="contact-interest-error" message={errors.interest} />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about the home, budget or timeline you have in mind."
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${fieldClass('message')} resize-y`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-navy group mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} aria-hidden="true" className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Enquiry
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <div aria-live="polite" className="mt-5">
              {status === 'success' ? (
                <p className="flex items-start gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {feedback}
                </p>
              ) : null}

              {status === 'error' && feedback ? (
                <p className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {feedback}
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted/80">
              By sending this form you agree to our privacy policy. We never share your
              details with third parties.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
