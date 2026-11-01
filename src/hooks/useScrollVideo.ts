import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type VideoStatus = 'loading' | 'ready' | 'error'

type ScrollVideoOptions = {
  /** Tall section that owns the scroll distance. */
  sectionRef: RefObject<HTMLElement>
  videoRef: RefObject<HTMLVideoElement>
  /** Called once per animation frame with the section's 0–1 scroll progress. */
  onFrame?: (progress: number) => void
  /** Disabled for reduced-motion users, who get the still poster instead. */
  enabled?: boolean
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/** How far from the very end we stop seeking, so the decoder never overshoots. */
const END_GUARD = 0.06

/**
 * Scrubs a `<video>` with scroll position instead of playing it: the element is
 * never played, its `currentTime` is driven by how far the tall section has been
 * scrolled. Progress is eased towards the pointer's position on every animation
 * frame so the motion stays fluid on wheel, trackpad and touch alike.
 */
export function useScrollVideo({
  sectionRef,
  videoRef,
  onFrame,
  enabled = true,
}: ScrollVideoOptions) {
  const [status, setStatus] = useState<VideoStatus>('loading')
  const [buffered, setBuffered] = useState(0)
  const frameCallback = useRef(onFrame)
  frameCallback.current = onFrame

  useEffect(() => {
    if (!enabled) return

    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let duration = 0
    let targetTime = 0
    let shownTime = 0
    let frame = 0

    const readProgress = () => {
      const rect = section.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      if (distance <= 0) return 0
      return clamp01(-rect.top / distance)
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(tick)
    }

    const apply = (progress: number) => {
      frameCallback.current?.(progress)
      if (!duration) return

      targetTime = progress * Math.max(duration - END_GUARD, 0)
      const delta = targetTime - shownTime
      if (Math.abs(delta) < 0.004) return

      shownTime += delta * 0.18
      if (Math.abs(targetTime - shownTime) < 0.004) shownTime = targetTime

      if (Math.abs(video.currentTime - shownTime) > 0.012) {
        try {
          video.currentTime = shownTime
        } catch {
          // A seek can be rejected while the browser is still buffering; the next
          // frame retries with the updated position.
        }
      }
      schedule()
    }

    const tick = () => {
      frame = 0
      apply(readProgress())
    }

    const onLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0
      shownTime = video.currentTime || 0
      schedule()
    }

    const onLoadedData = () => {
      duration = Number.isFinite(video.duration) ? video.duration : duration
      // Paint the first frame (or the frame already scrolled to) before the
      // loading screen leaves.
      const start = readProgress() * Math.max(duration - END_GUARD, 0)
      shownTime = start
      try {
        video.currentTime = start
      } catch {
        /* ignored: the poster remains visible */
      }
      setStatus('ready')
    }

    const onProgress = () => {
      if (!video.buffered.length || !video.duration) return
      const end = video.buffered.end(video.buffered.length - 1)
      setBuffered(clamp01(end / video.duration))
    }

    const onError = () => setStatus('error')

    video.pause()
    if (video.readyState >= 2) {
      onLoadedMetadata()
      onLoadedData()
    } else if (video.readyState >= 1) {
      onLoadedMetadata()
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('progress', onProgress)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    // Never trap a visitor behind the loading screen if the media stalls.
    const fallback = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'error' : current))
    }, 9000)

    return () => {
      window.clearTimeout(fallback)
      if (frame) window.cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('progress', onProgress)
      video.removeEventListener('error', onError)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled, sectionRef, videoRef])

  return { status, buffered }
}
