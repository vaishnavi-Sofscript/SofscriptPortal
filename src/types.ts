/**
 * Shared data shapes for the portal.
 *
 * Everything the UI renders comes from one of these four types, so this file is
 * the quickest way to understand what data the app deals with.
 */
import type { ReactNode } from "react"

/** Which of the three sections is currently showing. */
export type TabId = "apps" | "directory" | "training"

/** One tile in the application launcher. */
export type AppLink = {
  /** Product name shown on the tile. */
  name: string
  /** One-line explanation under the name. */
  desc: string
  /** Where the tile opens (always in a new tab). */
  url: string
  /** SVG shapes for the tile icon — see `components/icons.tsx`. */
  icon: ReactNode
}

/**
 * One row of the phone directory.
 *
 * The keys are SHOUTED because they come straight from the legacy
 * `phoneDatabase.js` file and are not renamed on the way in.
 */
export type DirectoryEntry = {
  NAME: string
  DESIGNATION: string
  DEPARTMENT: string
  EXTENSION: string
}

/** One demo/training video hosted alongside the legacy portal. */
export type TrainingVideo = {
  name: string
  desc: string
  /** File name inside the portal's `DEMO Files/` folder, e.g. `"ABDM.mp4"`. */
  file: string
}
