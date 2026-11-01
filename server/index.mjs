import express from 'express'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), 'var')
const submissionsFile = path.join(dataDir, 'contact-submissions.ndjson')

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^[+()\d][\d\s().-]{6,19}$/
const PROPERTY_TYPES = new Set([
  'Luxury Villa',
  'Modern House',
  'Apartment',
  'Investment Property',
])

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.post('/api/contact', async (request, response) => {
  const body = request.body ?? {}
  const values = {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim() : '',
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
    interest: typeof body.interest === 'string' ? body.interest.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
  }

  const errors = {}
  if (values.name.length < 2) errors.name = 'Please enter your full name.'
  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!PHONE_PATTERN.test(values.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!PROPERTY_TYPES.has(values.interest)) {
    errors.interest = 'Please choose the type of property you are interested in.'
  }
  if (values.message.length < 10) {
    errors.message = 'Please tell us a little more — at least 10 characters.'
  }

  if (Object.keys(errors).length > 0) {
    response.status(422).json({
      message: 'Please check the highlighted fields and send again.',
      errors,
    })
    return
  }

  try {
    await mkdir(dataDir, { recursive: true })
    await appendFile(
      submissionsFile,
      `${JSON.stringify({ ...values, receivedAt: new Date().toISOString() })}\n`,
      'utf8',
    )
  } catch (error) {
    console.error('Could not store contact submission', error)
    response.status(500).json({
      message: 'We could not save your message right now. Please call (555) 246-7890.',
    })
    return
  }

  response.status(201).json({ ok: true })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Horizon API listening on http://0.0.0.0:${port}`)
})
