import {
  calendarIcon,
  chartIcon,
  hospitalIcon,
  personIcon,
  recordsIcon,
} from "@/components/icons"
import type { AppLink } from "@/types"

/**
 * The tiles in the application launcher.
 *
 * To add, remove or re-point an application, edit this list — the launcher, the
 * scrolling ticker and the tile icons all read from it.
 *
 * Order matters in two ways:
 *  1. It is the on-screen order.
 *  2. Each tile's hover colour comes from `.app:nth-child(n)` in
 *     `styles/refresh.css`, so tile 1 is always red, tile 2 maroon, and so on.
 *     Add a colour there if the list grows past five.
 */
export const APPLICATIONS: AppLink[] = [
  {
    name: "CAREWORKS HMIS",
    desc: "Hospital management system",
    url: "http://123.108.45.16:8650/CLIENTR2/MainLoginAsp/Pages/login.aspx",
    icon: hospitalIcon,
  },
  {
    name: "CAREWORKS Lite",
    desc: "Clinical access",
    url: "https://cw.sofscript.com:8656/hmislogin/login",
    icon: personIcon,
  },
  {
    name: "totEM",
    desc: "Medical records",
    url: "http://123.108.45.16:8650/Totem_APP/login",
    icon: recordsIcon,
  },
  {
    name: "Appointment",
    desc: "Online booking",
    url: "http://123.108.45.16:8650/HostApp/Appointment",
    icon: calendarIcon,
  },
  {
    name: "Dashboard",
    desc: "Analytics",
    url: "http://123.108.45.16:8650/ManagementDashboard/app/login",
    icon: chartIcon,
  },
]
