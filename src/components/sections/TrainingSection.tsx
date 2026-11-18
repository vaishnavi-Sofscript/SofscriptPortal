import { Icon } from "@/components/Icon"
import { playIcon } from "@/components/icons"
import { TRAINING_VIDEOS } from "@/data/trainingVideos"
import type { TrainingVideo } from "@/types"

/**
 * The "Important files" tab: a button per demo video.
 *
 * Choosing one hands it back to `App.tsx`, which opens the player dialog.
 */
export function TrainingSection({
  onSelect,
}: {
  onSelect: (video: TrainingVideo) => void
}) {
  return (
    <section className="section" id="training">
      <div className="section-head">
        <div>
          <h2>Demo and training videos</h2>
          <p>Short walkthroughs of each system.</p>
        </div>
      </div>
      <div className="videos">
        {TRAINING_VIDEOS.map((video) => (
          <button
            key={video.file}
            className="video"
            onClick={() => onSelect(video)}
          >
            <span className="video-play">
              <Icon size={18}>{playIcon}</Icon>
            </span>
            <span>
              <div className="video-name">{video.name}</div>
              <div className="video-desc">{video.desc}</div>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
