/**
 * Every external URL the portal depends on.
 *
 * Change a server address here and nowhere else.
 */

/**
 * Root of the legacy portal, which still hosts the phone directory data and the
 * demo videos. Only reachable from the hospital network.
 */
export const PORTAL_BASE_URL = "https://cw.sofscript.com:8654/SPortal/"

/** Script that defines the global `phoneDatabase` object. */
export const PHONE_DATABASE_URL = `${PORTAL_BASE_URL}phoneDatabase.js`

/** Full URL of a demo video, given its file name (e.g. `"ABDM.mp4"`). */
export function videoUrl(file: string): string {
  return `${PORTAL_BASE_URL}DEMO%20Files/${encodeURIComponent(file)}`
}

// Images are not listed here: they live in src/assets/ and are imported
// directly by the components that use them, so the bundler resolves them.
