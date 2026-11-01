type LogoProps = {
  tone?: 'light' | 'dark'
  className?: string
}

/** Minimal architectural mark: three stepped building lines over a gold horizon. */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const ink = tone === 'light' ? '#FFFFFF' : '#092F57'

  return (
    <a
      href="#home"
      aria-label="Horizon Properties — back to top"
      className={`group flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M5 31h30" stroke="#C6A66B" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M10.5 31V18.5L20 12l9.5 6.5V31"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M16 31v-6.5h8V31" stroke="#C6A66B" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M20 12V7.5" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.82rem] font-extrabold uppercase tracking-[0.2em] sm:text-sm ${
            tone === 'light' ? 'text-white' : 'text-navy'
          }`}
        >
          Horizon
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.34em] ${
            tone === 'light' ? 'text-white/70' : 'text-muted'
          }`}
        >
          Properties
        </span>
      </span>
    </a>
  )
}
