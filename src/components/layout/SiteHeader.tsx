// Imported rather than linked by path so the bundler owns the file: it gets a
// cache-busting name in a normal build, and is inlined in the single-file build.
import logoUrl from "@/assets/logo.svg"

/** Fixed bar at the top of the page: logo and wordmark. */
export function SiteHeader() {
  return (
    <header className="bar">
      <div className="wrap bar-inner">
        <div className="mark">
          <img src={logoUrl} alt="" className="logo" />
          <span className="mark-text">
            Sofscript <span>Portal</span>
          </span>
        </div>
      </div>
    </header>
  )
}
