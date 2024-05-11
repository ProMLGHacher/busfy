import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from './Profile.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/store/storeHooks'
import { Like, User, Users } from '../../shared/consts/images'
import { Button } from '../../shared/ui/button/Button'
import { getUserThunk } from '../../features/authorization/getUserThunk'
import { classNames } from '../../shared/lib/classNames/classNames'
import { Link, useParams } from 'react-router-dom'
import { $api } from '../../shared/api/api'
import { Input } from '../../shared/ui/input/Input'
import { updateUserThunk } from '../../features/authorization/updateUserThunk'
import { Post, PostType, RecomendationsResponse } from '../../features/api/posts/recomendations'
import { AudioRecomendation } from '../../widgets/recomendations/audioRecomendation/AudioRecomendation'
import { ImageRecomendation } from '../../widgets/recomendations/imageRecomendation/ImageRecomendation'
import ModelRecomendation from '../../widgets/recomendations/model3dRecomendation/ModelRecomendation'
import { TextRecomendation } from '../../widgets/recomendations/textRecomendation/TextRecomendation'
import { VideoRecomendation } from '../../widgets/recomendations/videoRecomendation/VideoRecomendation'
import { Subscriptions } from './components/Subscriptions'
import { AccountStatus, UserRole } from '../../features/authorization/authSlice'

export const Profile = () => {

  const { userId } = useParams()

  const [recomendations, setRecomendations] = useState<RecomendationsResponse>()
  const [numColumns, setNumColumns] = useState(4)

  useLayoutEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 1000) {
        setNumColumns(1);
      } else if (width < 1200) {
        setNumColumns(2);
      } else if (width < 1400) {
        setNumColumns(3);
      } else {
        setNumColumns(4);
      }
    };

    window.addEventListener('resize', updateColumns);
    updateColumns();

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columns = useMemo(() => {
    const cols: Array<Array<Post>> = Array.from({ length: numColumns }, () => []);
    recomendations?.items.forEach((item, index) => {
      cols[index % numColumns].push(item);
    })
    return cols;
  }, [recomendations, numColumns])

  const [user, setUser] = useState<{
    "profile": {
      "id": string,
      "email": string,
      "role": UserRole,
      "urlIcon": string,
      "urlBackgroundImage": string,
      "nickname": string,
      "bio": string,
      "userTag": string,
      "accountStatus": AccountStatus
    },
    "subscriberCount": number,
    "countLikes": number
  }>()


  useEffect(() => {
    $api.get('/api/profile/' + userId).then(e => setUser(e.data))
    $api.get<RecomendationsResponse>('/api/tape/creator', {
      params: {
        count: 9999,
        userId: userId
      }
    })
      .then(e => setRecomendations(e.data))
  }, [])

  return (
    <div className={styles.profile}>
      <div style={{ backgroundImage: `url(${user?.profile.urlBackgroundImage})` }} className={styles.accountHeader}>
        {/* <label htmlFor="upload-photo">Browse...</label> */}
        <div className={styles.icon}>
          {user?.profile.urlIcon ? <img className={styles.avatar} src={user?.profile.urlIcon} alt="" /> : <User className={classNames(styles.avatar, undefined, [styles.noavatar])} />}
        </div>
      </div>

      <div className={styles.profileInfo}>
        <h3>{user?.profile.nickname}</h3>
        <h5>{user?.profile.userTag}</h5>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className={styles.countInfoItem}>
            <Users className={styles.usersImage} />
            <p>{user?.subscriberCount}</p>
          </div>
          <div className={styles.countInfoItem}>
            <Like className={styles.likeImage} />
            <p>{user?.countLikes}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button>Подписаться</Button>
        </div>
      </div>

      <div className={styles.recomendations} style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: `${[...Array(numColumns)].map(() => `${98 / numColumns}%`).join(' ')}` }}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((item, itemIndex) => {
              if (item.type === PostType.Image) {
                return <ImageRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Video) {
                return <VideoRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Text) {
                return <TextRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Audio) {
                return <AudioRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Model3D) {
                return <ModelRecomendation key={itemIndex} {...item} />
              }
              else {
                return <></>
              }
            })}
          </div>
        ))}
      </div>


    </div>
  )
}
