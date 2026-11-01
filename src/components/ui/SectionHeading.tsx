import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  actions?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  actions,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      } ${className}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          className={`mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.85rem] ${
            tone === 'dark' ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 text-base leading-relaxed ${
              tone === 'dark' ? 'text-white/70' : 'text-muted'
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Reveal>
  )
}
