export type ContactPayload = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

export type ContactField = keyof ContactPayload

export type ContactResult =
  | { ok: true }
  | { ok: false; errors?: Partial<Record<ContactField, string>>; message: string }

const FALLBACK_ERROR = 'We could not send your message. Please try again.'

/** Sends the enquiry to the site's own API, which stores it for the team. */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = (await response.json().catch(() => null)) as
      | { errors?: Partial<Record<ContactField, string>>; message?: string }
      | null

    if (!response.ok) {
      return {
        ok: false,
        errors: data?.errors,
        message: data?.message ?? FALLBACK_ERROR,
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message: 'We could not reach the office. Please check your connection or call (555) 246-7890.',
    }
  }
}
