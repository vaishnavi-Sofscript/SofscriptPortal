import type { ReactNode } from "react"

/**
 * Wraps raw SVG shapes in a correctly sized, stroked `<svg>`.
 *
 * All icons in the portal are line icons on a 24x24 grid that inherit the
 * surrounding text colour, so only the shapes differ — they live in
 * `icons.tsx`.
 *
 * ```tsx
 * <Icon size={16}>{searchIcon}</Icon>
 * ```
 */
export function Icon({
  children,
  size = 22,
}: {
  /** SVG shapes (`<path>`, `<circle>`, …) drawn on a 24x24 viewBox. */
  children: ReactNode
  /** Rendered width and height in pixels. */
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}
