import styles from './TextRecomendation.module.scss'
import { Recomendation as RecomendationType } from "../../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"

export const TextRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <div className={styles.text}>
                {props.description}
            </div>
        </Recomendation>
    )
}

