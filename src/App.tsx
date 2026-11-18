import { useCallback, useState } from "react"
import { VideoDialog } from "@/components/VideoDialog"
import { AppTicker } from "@/components/layout/AppTicker"
import { Hero } from "@/components/layout/Hero"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { TabBar } from "@/components/layout/TabBar"
import { ApplicationsSection } from "@/components/sections/ApplicationsSection"
import { DirectorySection } from "@/components/sections/DirectorySection"
import { TrainingSection } from "@/components/sections/TrainingSection"
import { usePhoneDirectory } from "@/hooks/usePhoneDirectory"
import type { TabId, TrainingVideo } from "@/types"

/**
 * The whole page.
 *
 * This component only decides *what* is on screen; every piece of markup lives
 * in `components/`. It holds the two bits of state that more than one child
 * cares about:
 *
 *  - `tab`   — which section is showing
 *  - `video` — the training video being played, if any
 *
 * Layout note: the header and footer are fixed, and everything between them
 * scrolls inside `.scroll-area`. The CSS targets `#root > .bar`, `#root > .foot`
 * and `main > section`, so keep those elements as direct children where they
 * are.
 */
export default function App() {
  const [tab, setTab] = useState<TabId>("apps")
  const [video, setVideo] = useState<TrainingVideo | null>(null)

  // Loaded once on mount; `null` until it resolves.
  const entries = usePhoneDirectory()

  // Stable so the dialog's Escape listener isn't re-attached on every render.
  const closeVideo = useCallback(() => setVideo(null), [])

  return (
    <>
      <SiteHeader />

      <div className="scroll-area">
        <AppTicker />
        <Hero />
        <TabBar active={tab} onChange={setTab} />

        <main className="wrap">
          {tab === "apps" && <ApplicationsSection />}
          {tab === "directory" && <DirectorySection entries={entries} />}
          {tab === "training" && <TrainingSection onSelect={setVideo} />}
        </main>
      </div>

      <SiteFooter />

      {video && <VideoDialog video={video} onClose={closeVideo} />}
    </>
  )
}
