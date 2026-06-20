import type { MouseEvent } from "react";

/**
 * Shared mousemove handler for `.spotlight` cards. Writes the cursor position
 * (relative to the card) into CSS custom props so the ::before radial glow
 * follows the pointer. Stateless — reads `currentTarget`, so one function
 * serves any number of cards.
 */
export function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
