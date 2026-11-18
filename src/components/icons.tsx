/**
 * The portal's icon set.
 *
 * Each export is just the shapes of one icon, drawn on a 24x24 grid. Render
 * them through `<Icon>` so size, stroke and colour stay consistent:
 *
 * ```tsx
 * <Icon size={18}>{playIcon}</Icon>
 * ```
 */

// --- Application tiles -------------------------------------------------------

/** Hospital building — CAREWORKS HMIS. */
export const hospitalIcon = (
  <path d="M4 21V6h5v15M15 21V6h5v15M2 21h20M9 10h6M12 7v6M10 21v-4h4v4" />
)

/** Person — CAREWORKS Lite / clinical access. */
export const personIcon = (
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
  </>
)

/** Tablet with a plus — totEM / medical records. */
export const recordsIcon = (
  <>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M12 9v6M9 12h6" />
  </>
)

/** Calendar with a tick — appointments. */
export const calendarIcon = (
  <>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M16 3v4M8 3v4M3 10h18M8.5 15l2.5 2.5 4.5-4.5" />
  </>
)

/** Bar chart — management dashboard. */
export const chartIcon = <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />

// --- Interface ---------------------------------------------------------------

/** Arrow leaving a box — "opens in a new tab". */
export const openIcon = <path d="M7 17 17 7M8 7h9v9" />

/** Magnifying glass — directory search field. */
export const searchIcon = (
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </>
)

/** Two stacked sheets — copy an extension. */
export const copyIcon = (
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </>
)

/** Tick — shown briefly after a successful copy. */
export const checkIcon = <path d="m5 12 4 4L19 6" />

/** Triangle — play a training video. */
export const playIcon = <path d="m9 7 8 5-8 5Z" />

/** Cross — close the video dialog. */
export const closeIcon = <path d="m6 6 12 12M18 6 6 18" />
