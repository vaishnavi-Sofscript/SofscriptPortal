import { Icon } from "@/components/Icon"
import { openIcon } from "@/components/icons"
import { APPLICATIONS } from "@/data/applications"

/**
 * The "Applications" tab: one tile per system, each opening in a new tab.
 *
 * Edit `data/applications.tsx` to change what is listed here.
 */
export function ApplicationsSection() {
  return (
    <section className="apps-panel">
      <div className="launcher">
        {APPLICATIONS.map((app) => (
          <a
            key={app.name}
            className="app"
            href={app.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="app-icon">
              <Icon>{app.icon}</Icon>
            </span>
            <div>
              <div className="app-name">{app.name}</div>
              <div className="app-desc">{app.desc}</div>
              <div className="app-open">
                Open <Icon size={15}>{openIcon}</Icon>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
