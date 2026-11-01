import type { ContactField, ContactPayload } from './contact'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^[+()\d][\d\s().-]{6,19}$/

export type ContactErrors = Partial<Record<ContactField, string>>

export const emptyContact: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
}

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.interest.trim()) {
    errors.interest = 'Please choose the type of property you are interested in.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please tell us a little more — at least 10 characters.'
  }

  return errors
}
