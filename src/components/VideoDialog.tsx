import { Icon } from "@/components/Icon"
import { closeIcon } from "@/components/icons"
import { videoUrl } from "@/config"
import { useEscapeKey } from "@/hooks/useEscapeKey"
import type { TrainingVideo } from "@/types"

/**
 * Full-screen player for one training video.
 *
 * Rendered only while a video is selected, so it can own its own Escape-key
 * handling. It closes on Escape, on the close button, and on a click outside
 * the box — the click on the box itself is stopped so it doesn't bubble up to
 * the backdrop.
 */
export function VideoDialog({
  video,
  onClose,
}: {
  video: TrainingVideo
  onClose: () => void
}) {
  useEscapeKey(onClose)

  return (
    <div
      className="modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.name}
    >
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          {video.name}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close video"
          >
            <Icon size={18}>{closeIcon}</Icon>
          </button>
        </div>
        <video src={videoUrl(video.file)} controls autoPlay playsInline />
      </div>
    </div>
  )
}
