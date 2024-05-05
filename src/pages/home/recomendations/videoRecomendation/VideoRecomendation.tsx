import styles from './VideoRecomendation.module.scss'
import { Recomendation as RecomendationType } from "../../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"

export const VideoRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <video className={styles.video} src={props.urlFile || ''} onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => e.currentTarget.pause()}>
                Your browser does not support the video tag.
            </video>
        </Recomendation>
    )
}

