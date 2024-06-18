import styles from './VideoPreview.module.scss'
import { Post as RecomendationType } from "../../../features/api/posts/recomendations"

export const VideoPreview = (props: RecomendationType & { controls?: boolean } | { urlFile: string, controls?: boolean }) => {
    return (
        <video style={{
            maxHeight: "600px"
        }} className={styles.video} controls={props.controls} src={props.urlFile || ''} onMouseEnter={!props.controls ? e => e.currentTarget.play() : undefined} onMouseLeave={!props.controls ? e => e.currentTarget.pause() : undefined}>
            Your browser does not support the video tag.
        </video>
    )
}

