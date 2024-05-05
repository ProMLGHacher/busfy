import { Dots, HeartFilled, Heart } from '../../../shared/consts/images'
import styles from './Recomendation.module.scss'

export const Recomendation = (props: {
    categoryName: string | null 
    hasEvaluated: boolean
    urlFile: string | null
    description: string | null,
    children: React.ReactNode
}) => {
    return (
        <div className={styles.recomendation}>
            <Dots className={styles.dots} />
            <div className={styles.info}>
                <div className={styles.title}>{props.categoryName}</div>
                {props.hasEvaluated ? <HeartFilled /> : <Heart />}
            </div>
            {props.children}
        </div>
    )
}

