import { useState } from "react"

import { Icon } from "@/components/Icon"
import { searchIcon } from "@/components/icons"
import { DirectoryTable } from "@/components/sections/DirectoryTable"
import type { DirectoryEntry } from "@/types"

/**
 * True if any field of the row contains `query`.
 *
 * One search box covers name, designation, department and extension, so the
 * fields are simply joined before matching.
 */
function matches(entry: DirectoryEntry, query: string): boolean {
  return Object.values(entry).join(" ").toLowerCase().includes(query)
}

/**
 * The "Phone directory" tab: search box plus the results table.
 *
 * The rows are loaded by `usePhoneDirectory` in `App.tsx` and passed in, where
 * `null` means "still loading".
 */
export function DirectorySection({
  entries,
}: {
  entries: DirectoryEntry[] | null
}) {
  const [query, setQuery] = useState("")

  const rows = (entries ?? []).filter((entry) =>
    matches(entry, query.toLowerCase()),
  )

  return (
    <section className="section" id="directory">
      <div className="section-head">
        <div>
          <h2>Phone directory</h2>
          <p>Find a colleague and copy their extension.</p>
        </div>
        <label className="search">
          <Icon size={17}>{searchIcon}</Icon>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, department or extension"
            aria-label="Search directory"
          />
        </label>
      </div>

      <div className="table w-full">
        {entries === null ? (
          <div className="empty">Loading directory</div>
        ) : entries.length === 0 ? (
          // The data file is only served inside the hospital network.
          <div className="empty">
            The directory is available on the hospital network.
          </div>
        ) : (
          <DirectoryTable rows={rows} />
        )}

        {entries && entries.length > 0 && rows.length === 0 && (
          <div className="empty">No one matches that search.</div>
        )}
      </div>
    </section>
  )
}
