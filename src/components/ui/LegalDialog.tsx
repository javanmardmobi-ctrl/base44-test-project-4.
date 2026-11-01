import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { legalDocuments, type LegalKind } from '../../data/legal'

type LegalDialogProps = {
  kind: LegalKind | null
  onClose: () => void
}

export function LegalDialog({ kind, onClose }: LegalDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!kind) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [kind, onClose])

  if (!kind) return null
  const document_ = legalDocuments[kind]

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        className="relative z-10 max-h-[85svh] w-full max-w-xl overflow-y-auto rounded-[24px] bg-white p-6 shadow-card sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="legal-dialog-title" className="text-xl font-bold text-navy">
              {document_.title}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted/80">
              {document_.updated}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors duration-300 hover:bg-mist"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {document_.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="text-sm font-semibold text-navy">{section.heading}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
