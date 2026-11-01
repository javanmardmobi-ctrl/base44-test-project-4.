import { useEffect, useState } from 'react'

/** Tracks which section currently owns the viewport for the active navigation state. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.35
      let current = ids[0] ?? ''

      ids.forEach((id) => {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= marker) {
          current = id
        }
      })

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1] ?? current

      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}
