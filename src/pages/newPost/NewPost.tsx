import { useEffect, useMemo, useState } from 'react'
import styles from './NewPost.module.scss'
import { ContentCategory, getContentCategories } from '../../features/api/contentCategory/getContentCategories'
import { Button } from '../../shared/ui/button/Button'
import { Sub, SubType } from '../../features/types/Sub'
import { $api } from '../../shared/api/api'
import { useAppSelector } from '../../app/store/storeHooks'
import { publishNewPost } from '../../features/api/posts/publishNewPost'

const NewPost = () => {

  const userId = useAppSelector(state => state.auth.user?.id)

  const [file, setFile] = useState<File>()
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [subId, setSubId] = useState<string | undefined>()

  const handleDubmit = () => {

    if (!file && text.trim().length < 0) return
    
    

    publishNewPost({
      category: category,
      description: description,
      subscriptionId: subId,
      file: text.trim().length > 0 ? undefined : file,
      text: text.trim().length > 0 ? text : undefined
    })
  }

  const [contentCategories, setContentCategories] = useState<ContentCategory[]>()



  useEffect(() => {
    getContentCategories().then(e => {
      setContentCategories(e)
      setCategory(e[0].name)
    })
  }, [])

  const fileUrl = useMemo(() => {
    if (!file) return
    return URL.createObjectURL(file)
  }, [file])


  const [mySubs, setMySubs] = useState<Sub[]>()

  useEffect(() => {
    $api.get<Sub[]>('/api/subscriptions-created', { params: { userId } }).then(e => {
      setMySubs(e.data)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {file?.type}
        <div style={{ position: 'relative', minHeight: '300px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #888', transition: 'opacity .3s', opacity: text ? 0.2 : 1 }}>
          {fileUrl && <img src={fileUrl} alt="" />}
          <p style={{ textAlign: 'center' }}>Выберите файл</p>
          <input style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0' }} type="file" onChange={e => {
            setFile(e.target.files?.[0])
          }} />
        </div>
        <div>
          <p>Описание</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', minHeight: '200px', border: '1px solid #888', borderRadius: '20px', padding: '10px', resize: 'vertical' }} placeholder='Введите описание'></textarea>
        </div>
        <div>
          <p>Категория</p>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '50px',
              border: '1px solid #888',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}>
            {contentCategories?.map(e => <option value={e.name}>{e.name}</option>)}
          </select>
        </div>
        <div>
          <p>Подписка</p>
          <select
            value={subId}
            onChange={e => setSubId(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '50px',
              border: '1px solid #888',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}>
              <option value={undefined}>Публичный</option>
            {mySubs?.map(e => <option value={e.id}>{e.type === SubType.Private ? "Приватный" : e.type === SubType.Public ? 'Публичный' : 'Единый'} на {e.countDays} дней за {e.price} рублей</option>)}
          </select>
        </div>
      </div>
      <div>
        <p>Текст</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '100%', minHeight: '400px', border: '1px solid #888', borderRadius: '20px', padding: '10px', resize: 'vertical' }} placeholder='Текстовый пост'
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px'
        }}>
          <Button onClick={handleDubmit}>Выложить</Button>
        </div>
      </div>
    </div>
  )
}

export default NewPost