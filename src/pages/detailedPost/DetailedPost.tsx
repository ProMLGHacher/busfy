import { useParams } from 'react-router-dom'
import styles from './DetailedPost.module.scss'
import { useEffect, useState } from 'react'
import { Post, PostType, RecomendationsResponse, getRecomendations } from '../../shared/api/posts/recomendations'
import { getPostById } from '../../shared/api/posts/getPostById'
import { ShowPreview } from '../../widgets/preview/ShowPreview'
import { AudioRecomendation } from '../../widgets/recomendations/audioRecomendation/AudioRecomendation'
import { ImageRecomendation } from '../../widgets/recomendations/imageRecomendation/ImageRecomendation'
import ModelRecomendation from '../../widgets/recomendations/model3dRecomendation/ModelRecomendation'
import { TextRecomendation } from '../../widgets/recomendations/textRecomendation/TextRecomendation'
import { VideoRecomendation } from '../../widgets/recomendations/videoRecomendation/VideoRecomendation'
import { User } from '../../shared/consts/images'

export const DetailedPost = () => {

  const { id } = useParams()

  const [post, setPost] = useState<Post | undefined>()
  const [similar, setSimilar] = useState<RecomendationsResponse>()


  useEffect(() => {
    if (!id) return

    getRecomendations(9999, 0).then((response) => setSimilar(response))
    getPostById(id).then(e => setPost(e))
  }, [id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>{post && <ShowPreview videoControls {...post} />}</div>
        <div>
          <div>
            {post?.profileCreator.urlIcon ? <img src={post?.profileCreator.urlIcon} alt="" /> : <User />}
            <div>
              <h5>{post?.profileCreator.nickname}</h5>
            </div>
            <p>{post?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.similar}>
        <h2>Похожее</h2>
        {similar?.items.filter(e => {
          return e.id != id
        }).map(item => {
          if (item.type === PostType.Image) {
            return <ImageRecomendation key={item.id} {...item} />
          }
          else if (item.type === PostType.Video) {
            return <VideoRecomendation key={item.id} {...item} />
          }
          else if (item.type === PostType.Text) {
            return <TextRecomendation key={item.id} {...item} />
          }
          else if (item.type === PostType.Audio) {
            return <AudioRecomendation key={item.id} {...item} />
          }
          else if (item.type === PostType.Model3D) {
            return <ModelRecomendation key={item.id} {...item} />
          }
          else {
            return <></>
          }
        })}
      </div>
    </div>
  )
}
