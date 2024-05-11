import { Link, useParams } from 'react-router-dom'
import styles from './DetailedPost.module.scss'
import { useEffect, useState } from 'react'
import { Post, PostType, RecomendationsResponse, getRecomendations } from '../../features/api/posts/recomendations'
import { getPostById } from '../../features/api/posts/getPostById'
import { ShowPreview } from '../../widgets/preview/ShowPreview'
import { AudioRecomendation } from '../../widgets/recomendations/audioRecomendation/AudioRecomendation'
import { ImageRecomendation } from '../../widgets/recomendations/imageRecomendation/ImageRecomendation'
import ModelRecomendation from '../../widgets/recomendations/model3dRecomendation/ModelRecomendation'
import { TextRecomendation } from '../../widgets/recomendations/textRecomendation/TextRecomendation'
import { VideoRecomendation } from '../../widgets/recomendations/videoRecomendation/VideoRecomendation'
import { Heart, HeartFilled, Plus, User } from '../../shared/consts/images'
import { Comment, getPostComments } from '../../features/api/getPostComments/getPostComments'
import { $api } from '../../shared/api/api'
import { getPostLikesCount } from '../../features/api/getPostLikesCount/getPostLikesCount'
import { Input } from '../../shared/ui/input/Input'
import { Button } from '../../shared/ui/button/Button'

export const DetailedPost = () => {

  const { id } = useParams()

  const [post, setPost] = useState<Post | undefined>()
  const [hasEvaluated, setHasEvaluated] = useState(post?.hasEvaluated)
  const [similar, setSimilar] = useState<RecomendationsResponse>()
  const [comments, setComments] = useState<Comment[]>()
  const [countLikes, setCountLikes] = useState<number>(0)


  useEffect(() => {
    if (!id) return

    getRecomendations(9999, 0).then((response) => setSimilar(response))
    getPostById(id).then(e => setPost(e))
    getPostComments(id).then(e => setComments(e))
    getPostLikesCount(id).then(e => setCountLikes(e))
  }, [id])

  useEffect(() => {
    setHasEvaluated(post?.hasEvaluated)
  }, [post])

  const like = () => {
    $api.post('/api/post/like', undefined, {
      params: {
        postId: id
      }
    })
      .then(e => {
        setHasEvaluated(e.data == 'Evaluated')
        setCountLikes(prev => {
          return e.data == 'Evaluated' ? prev + 1 : prev - 1
        })
      })
  }

  const [comment, setComment] = useState("")

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.preview}>
          {post && <ShowPreview videoControls {...post} />}
        </div>
        <div className={styles.contentInfo}>
          <Link to={'/user/' + post?.profileCreator.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'black' }}>
            {post?.profileCreator.urlIcon ? <img style={{ width: '50px', height: '50px' }} src={post?.profileCreator.urlIcon} alt="" /> : <User />}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h5>{post?.profileCreator.nickname}</h5>
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* <div style={{position: 'relative'}}>
              <button className={styles.sub}><Plus /></button>
            </div> */}
            <button className={styles.like} onClick={like}>
              <div>{hasEvaluated ? <HeartFilled style={{ color: 'red', width: '22px', height: '22px' }} /> : <Heart style={{ width: '22px', height: '22px' }} />}</div>
              {countLikes}
            </button>
          </div>
        </div>
        <p style={{ marginTop: '10px' }}>{post?.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px', marginBottom: '20px' }}>
          <Input value={comment} onChange={e => setComment(e.target.value)} placeholder='Комментарий' style={{ flex: 1 }} />
          <Button onClick={() => {
            if (!id) return
            $api.post('/api/post/comment', { comment: comment }, { params: { postId: id } })
              .then(_ => {
                setComment('')
                getPostComments(id).then(e => setComments(e))
              })
          }}>Отправить</Button>
        </div>
        <div className={styles.comments}>
          {
            comments?.map(comment => <div style={{ display: 'flex', gap: '10px' }}>
              {comment.profileBody.urlIcon ? <img style={{ width: '50px', height: '50px' }} src={comment.profileBody.urlIcon} alt="" /> : <User />}
              <div>
                <p>{comment.profileBody.nickname}</p>
                <p>{comment.comment}</p>
              </div>
            </div>)
          }
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
