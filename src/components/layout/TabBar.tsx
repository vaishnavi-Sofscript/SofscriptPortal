import { TABS } from "@/data/tabs"
import type { TabId } from "@/types"

/** Pill-shaped switcher for the three portal sections. */
export function TabBar({
  active,
  onChange,
}: {
  active: TabId
  onChange: (tab: TabId) => void
}) {
  return (
    <nav className="tabs-bar" aria-label="Portal sections">
      <div className="wrap">
        <div className="tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              className="tab"
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
