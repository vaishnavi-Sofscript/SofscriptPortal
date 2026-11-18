import { useEffect, useRef, useState } from "react"

/** How long the "copied" tick stays visible, in milliseconds. */
const FEEDBACK_MS = 1500

/**
 * Copies short strings to the clipboard and remembers the last one copied so
 * the button can show a tick for a moment.
 *
 * ```tsx
 * const { copy, copied } = useCopyToClipboard()
 * <button onClick={() => copy(ext)}>{copied === ext ? "Copied" : "Copy"}</button>
 * ```
 */
export function useCopyToClipboard() {
  /** The most recently copied value, or `""` once the feedback has faded. */
  const [copied, setCopied] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Don't update state after the component has gone away.
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value)
    setCopied(value)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(""), FEEDBACK_MS)
  }

  return { copied, copy }
}
