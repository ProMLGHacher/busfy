import { Link } from "react-router-dom"
import { Dots, HeartFilled, Heart, Arrow } from "../../shared/consts/images"
import styles from './Recomendation.module.scss'
import { $api } from "../../shared/api/api"

export const Recomendation = (props: {
    categoryName: string | null
    hasEvaluated: boolean
    urlFile: string | null
    description: string | null,
    children: React.ReactNode,
    id?: string
}) => {

    let { hasEvaluated } = props

    const like = () => {
        $api.post('/api/post/like', undefined, {
            params: {
                postId: props.id
            }
        })
        .then(_ => {
            hasEvaluated = !hasEvaluated
        })
    }

    return (
        <div className={styles.recomendation}>
            <Dots className={styles.dots} />
            <div className={styles.info}>
                <div className={styles.title}>{props.categoryName}</div>
                <div className={styles.buttons}>
                    <Link to={`/post/${props.id}`} className={styles.open}><Arrow className={styles.arrow} /></Link>
                    {hasEvaluated ? <button onClick={like}><HeartFilled /></button> : <button onClick={like}><Heart /></button>}
                </div>
            </div>
            {props.children}
        </div>
    )
}

