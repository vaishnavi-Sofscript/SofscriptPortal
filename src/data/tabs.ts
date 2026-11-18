import type { TabId } from "@/types"

/** The three portal sections, in the order they appear in the tab bar. */
export const TABS: { id: TabId; label: string }[] = [
  { id: "apps", label: "Applications" },
  { id: "directory", label: "Phone directory" },
  { id: "training", label: "Important files" },
]
