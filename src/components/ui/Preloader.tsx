type PreloaderProps = {
  visible: boolean
  /** 0–1 share of the cinematic film already buffered. */
  progress: number
}

/** Navy curtain shown until the film's metadata and first frame are ready. */
export function Preloader({ visible, progress }: PreloaderProps) {
  const percent = Math.round(Math.min(1, Math.max(0, progress)) * 100)

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center gap-9 bg-navy-deep px-6 text-center transition-opacity duration-700 ease-premium ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-white/60">
          Horizon
        </span>
        <span className="text-[1.05rem] font-semibold uppercase tracking-[0.34em] text-white">
          Properties
        </span>
        <span aria-hidden="true" className="mt-2 h-px w-16 bg-gold/70" />
      </div>

      <div className="w-full max-w-[220px]">
        <div className="h-px w-full overflow-hidden bg-white/15">
          <span
            className="block h-full origin-left bg-gold transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${Math.max(percent / 100, 0.04)})` }}
          />
        </div>
        <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/45">
          Preparing the tour · {percent}%
        </p>
      </div>
    </div>
  )
}
