import { useEffect, useState } from 'react'

/**
 * Responsive breakpoint hook — drives sidebar drawer vs fixed behavior.
 * Mobile: < 768px | Tablet: 768–1023px | Desktop: >= 1024px
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    setMatches(media.matches)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const

export function useIsMobile() {
  return useMediaQuery(BREAKPOINTS.mobile)
}

export function useIsTablet() {
  return useMediaQuery(BREAKPOINTS.tablet)
}

export function useIsDesktop() {
  return useMediaQuery(BREAKPOINTS.desktop)
}
