import { useEffect, useState } from "react"

import { PHONE_DATABASE_URL } from "@/config"
import type { DirectoryEntry } from "@/types"

/**
 * `phoneDatabase.js` is a plain script that assigns a global, not a module, so
 * TypeScript needs to be told the global exists.
 */
declare const phoneDatabase: { extensionList: DirectoryEntry[] } | undefined

/**
 * Loads the phone directory from the legacy portal.
 *
 * It is fetched by injecting a `<script>` tag because the data ships as a
 * global-assigning script rather than JSON.
 *
 * @returns `null` while loading, then the rows — or an empty array if the
 * portal is unreachable, which is the normal case off the hospital network.
 */
export function usePhoneDirectory(): DirectoryEntry[] | null {
  const [entries, setEntries] = useState<DirectoryEntry[] | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = PHONE_DATABASE_URL
    script.onload = () =>
      setEntries(
        typeof phoneDatabase !== "undefined" ? phoneDatabase.extensionList : [],
      )
    script.onerror = () => setEntries([])
    document.body.appendChild(script)
    return () => script.remove()
  }, [])

  return entries
}
