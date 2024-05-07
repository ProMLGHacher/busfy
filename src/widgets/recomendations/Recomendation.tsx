import { Link } from "react-router-dom"
import { Dots, HeartFilled, Heart, Arrow } from "../../shared/consts/images"
import styles from './Recomendation.module.scss'

export const Recomendation = (props: {
    categoryName: string | null
    hasEvaluated: boolean
    urlFile: string | null
    description: string | null,
    children: React.ReactNode,
    id?: string
}) => {
    return (
        <div className={styles.recomendation}>
            <Dots className={styles.dots} />
            <div className={styles.info}>
                <div className={styles.title}>{props.categoryName}</div>
                <div className={styles.buttons}>
                    <Link to={`/post/${props.id}`} className={styles.open}><Arrow className={styles.arrow} /></Link>
                    {props.hasEvaluated ? <HeartFilled /> : <Heart />}
                </div>
            </div>
            {props.children}
        </div>
    )
}

