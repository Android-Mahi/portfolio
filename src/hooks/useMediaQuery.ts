import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query and re-render on change.
 * SSR-safe (returns `false` until mounted).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. Gate all non-essential animation on this. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on phone-sized viewports — used to swap the heavy 3D hero for a light fallback. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

/** True at lg breakpoint and above (≥1024px) — the two-column layout where the 3D canvas is near-square. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
