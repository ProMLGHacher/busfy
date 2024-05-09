import styles from './TextPreview.module.scss'
import { Post as RecomendationType } from "../../../features/api/posts/recomendations"

export const TextPreview = (props: RecomendationType) => {
    return (
            <div className={styles.text}>
                {props.description}
            </div>
    )
}

