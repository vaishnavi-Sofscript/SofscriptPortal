import { useEffect } from "react"

/**
 * Calls `onEscape` whenever the Escape key is pressed.
 *
 * Used by the video dialog, so mount it only while the thing being dismissed
 * is actually on screen.
 */
export function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onEscape])
}
