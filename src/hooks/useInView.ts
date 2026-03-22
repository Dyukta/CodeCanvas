import { useEffect, useState } from 'react'

export function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>
): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.08 })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return isInView
}