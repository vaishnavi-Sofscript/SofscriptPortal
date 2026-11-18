import type { TrainingVideo } from "@/types"

/**
 * Demo and training videos listed under "Important files".
 *
 * `file` must match the file name inside the legacy portal's `DEMO Files/`
 * folder exactly, spaces included — `config.ts` handles the URL escaping.
 */
export const TRAINING_VIDEOS: TrainingVideo[] = [
  { name: "ABDM", desc: "Demo and training", file: "ABDM.mp4" },
  {
    name: "Mob EMS Dash",
    desc: "Mobile EMS dashboard",
    file: "Mob EMS Dash.mp4",
  },
  {
    name: "Mobile Dashboard",
    desc: "Mobile dashboard demo",
    file: "MobileDash.mp4",
  },
  {
    name: "OP EMR RGHS 2",
    desc: "OP EMR and RGHS demo",
    file: "OP EMR RGHS 2.mp4",
  },
  {
    name: "Slate Admin Portal",
    desc: "Admin portal demo",
    file: "Slate_Admin_Portal.mp4",
  },
  {
    name: "Slate with AI",
    desc: "Demo and training",
    file: "Slate_with_AI_ext.mp4",
  },
]
