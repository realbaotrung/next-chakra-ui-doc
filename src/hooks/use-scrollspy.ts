import { useEffect, useRef, useState } from 'react'

export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit,
) {
  const [activeId, setActiveId] = useState<string>()
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // get all elements from DOM
    const elements = selectors.map((selector) =>
      document.querySelector(selector),
    )

    // stops watching all of its target elements for visibility changes.
    observer.current?.disconnect()

    // initialize observer
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.getAttribute('id'))
        }
      })
    }, options)

    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el)
      }
    })

    return () => observer.current?.disconnect()
  }, [selectors, options])

  return activeId
}
