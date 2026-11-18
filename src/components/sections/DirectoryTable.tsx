import { Icon } from "@/components/Icon"
import { checkIcon, copyIcon } from "@/components/icons"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import type { DirectoryEntry } from "@/types"

/**
 * The directory results table, with a copy button on every extension.
 *
 * On narrow screens the Designation column is hidden by CSS rather than by
 * JavaScript — see the 640px breakpoint in `styles/components.css`.
 */
export function DirectoryTable({ rows }: { rows: DirectoryEntry[] }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Extension</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.NAME + row.EXTENSION}>
            <td>{row.NAME}</td>
            <td>{row.DESIGNATION}</td>
            <td>{row.DEPARTMENT}</td>
            <td>
              <span className="ext">
                {row.EXTENSION}
                <button
                  className="copy"
                  onClick={() => copy(row.EXTENSION)}
                  aria-label={`Copy extension ${row.EXTENSION}`}
                >
                  <Icon size={16}>
                    {copied === row.EXTENSION ? checkIcon : copyIcon}
                  </Icon>
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
