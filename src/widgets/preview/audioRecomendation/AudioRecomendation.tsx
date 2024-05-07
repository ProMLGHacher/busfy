import styles from './AudioRecomendation.module.scss'
import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"

export const AudioRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <div className={styles.audio}>
                <audio src={props.urlFile || ''} controls>
                    Your browser does not support the audio tag.
                </audio>
            </div>
        </Recomendation>
    )
}

