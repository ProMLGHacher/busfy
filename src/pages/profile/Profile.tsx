import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from './Profile.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/store/storeHooks'
import { logOut } from '../../features/authorization/authSlice'
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


  useEffect(() => {
    $api.get<RecomendationsResponse>('/api/tape/creator', {
      params: {
        count: 9999,
        userId: userId
      }
    })
      .then(e => setRecomendations(e.data))
  }, [])








  const user = useAppSelector(state => state.auth.user)

  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(getUserThunk())
  }, [])

  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [tag, setTag] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (!user) return
    if (!user.nickname) return
    if (user.bio === null ? false : !user.bio) return
    if (user.email === null ? false : !user.email) return
    if (user.userTag === null ? false : !user.userTag) return

    setName(user?.nickname)
    setDescription(user?.bio!)
    setMail(user?.email!)
    setTag(user?.userTag!)
  }, [user])

  const [editMode, setEditMode] = useState(false)

  return (
    <div className={styles.profile}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={logout}>
          Logout
        </Button>
      </div>

      <div style={{ backgroundImage: `url(${user?.urlBackgroundImage})` }} className={styles.accountHeader}>
        {/* <label htmlFor="upload-photo">Browse...</label> */}
        <input type="file" accept='image/*' onChange={e => {
          if (!e.target.files?.[0]) return
          const formData = new FormData()
          formData.append('file', e.target.files[0])
          $api.post('/api/upload/profile-background', formData).then(_ => dispatch(getUserThunk()))
        }} name="photo" id="upload-photo" className={styles.coverUpload} />
        {user?.urlIcon ? <img className={styles.avatar} src={user?.urlIcon} alt="" /> : <User className={classNames(styles.avatar, undefined, [styles.noavatar])} />}
      </div>

      <div className={styles.profileInfo}>
        <h3>{user?.nickname}</h3>
        <h5>{user?.userTag}</h5>
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
        {userId ?
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button>Подписаться</Button>
          </div>
          :
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button disabled={editMode} onClick={() => { setEditMode(prev => !prev) }}>{editMode ? "Назад" : "Редактировать"}</Button>
            {editMode || <Link to={'/newPost'}><Button>Создать пост</Button></Link>}
            {editMode && <Button onClick={() => {
              dispatch(updateUserThunk({
                bio: description,
                email: mail,
                nickname: name,
                userTag: tag
              }))
            }}>Сохранить</Button>}
          </div>}
      </div>

      {
        editMode ?
          <div className={styles.editMode}>
            <p style={{ width: '50%', color: '#888' }}>Имя пользователя</p>
            <Input value={name} onChange={e => { setName(e.target.value) }} style={{ width: '50%', marginBottom: '20px' }} />
            <p style={{ width: '50%', color: '#888' }}>Почта</p>
            <Input value={mail} onChange={e => { setMail(e.target.value) }} style={{ width: '50%', marginBottom: '20px' }} />
            <p style={{ width: '50%', color: '#888' }}>Тег</p>
            <Input value={tag} onChange={e => { setTag(e.target.value) }} style={{ width: '50%', marginBottom: '20px' }} />
            <p style={{ width: '50%', color: '#888' }}>Описание</p>
            <Input value={description} onChange={e => { setDescription(e.target.value) }} style={{ width: '50%', marginBottom: '20px' }} />
          </div>
          :
          <div className={styles.recomendations} style={{ display: 'grid', gridTemplateColumns: `${[...Array(numColumns)].map(() => `${98 / numColumns}%`).join(' ')}` }}>
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
      }

    </div>
  )
}
