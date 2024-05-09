import styles from './AudioPreview.module.scss'
import { Post as RecomendationType } from "../../../features/api/posts/recomendations"

export const AudioPreview = (props: RecomendationType) => {
    return (
        <div className={styles.audio}>
            <audio src={props.urlFile || ''} controls>
                Your browser does not support the audio tag.
            </audio>
        </div>
    )
}

