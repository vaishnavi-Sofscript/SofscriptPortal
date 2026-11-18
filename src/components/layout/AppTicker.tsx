import { Icon } from "@/components/Icon"
import { APPLICATIONS } from "@/data/applications"

/**
 * Slow marquee of the application names under the header.
 *
 * The list is rendered twice so the CSS animation can scroll by exactly half
 * its width and loop without a visible jump. Decorative only, so it is hidden
 * from screen readers — every name is also a real link in the launcher.
 */
export function AppTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...APPLICATIONS, ...APPLICATIONS].map((app, index) => (
          <span className="ticker-item" key={index}>
            <Icon size={14}>{app.icon}</Icon>
            {app.name}
          </span>
        ))}
      </div>
    </div>
  )
}
