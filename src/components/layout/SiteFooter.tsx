// Same artwork as public/favicon.svg, kept here as a second copy because the
// browser tab icon must stay in public/ while this one is bundled into the page.
import markUrl from "@/assets/mark.svg"

/** Fixed bar at the bottom of the page. */
export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <img src={markUrl} alt="" className="foot-mark" />
        Sofscript Portal
      </div>
    </footer>
  )
}
