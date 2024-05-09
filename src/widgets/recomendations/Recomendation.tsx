import { Link } from "react-router-dom"
import { Dots, HeartFilled, Heart, Arrow } from "../../shared/consts/images"
import styles from './Recomendation.module.scss'
import { $api } from "../../shared/api/api"
import { useState } from "react"

export const Recomendation = (props: {
    categoryName: string | null
    hasEvaluated: boolean
    urlFile: string | null
    description: string | null,
    children: React.ReactNode,
    id?: string,
    downloadLink?: string | null
}) => {

    const [hasEvaluated, setHasEvaluated] = useState(props.hasEvaluated)

    const like = () => {
        $api.post('/api/post/like', undefined, {
            params: {
                postId: props.id
            }
        })
            .then(e => {
                setHasEvaluated(e.data == 'Evaluated')
            })
    }

    return (
        <div className={styles.recomendation}>
            <div className={styles.dotsWrapper}>
                <Dots className={styles.dots} />
                <div className={styles.dotsDropDown}>
                    {props.downloadLink && <a href={props.downloadLink}>Скачать</a>}
                    <button className={styles.share} onClick={() => {
                        navigator.share({
                            title: props.description ?? undefined,
                            url: `${window.location.protocol}//${window.location.hostname}/post/${props.id}`
                        })
                    }}>Поделиться</button>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{props.categoryName}</div>
                <div className={styles.buttons}>
                    <Link to={`/post/${props.id}`} className={styles.open}><Arrow className={styles.arrow} /></Link>
                    {hasEvaluated ? <button className={styles.likeButton} onClick={like}><HeartFilled style={{ color: 'red' }} /></button> : <button className={styles.likeButton} onClick={like}><Heart /></button>}
                </div>
            </div>
            {props.children}
        </div>
    )
}

