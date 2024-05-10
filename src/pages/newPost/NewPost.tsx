import { useState } from 'react'
import styles from './NewPost.module.scss'

const NewPost = () => {

  const [file, setFile] = useState<File>()

  return (
    <div className={styles.wrapper}>
      <div>
        <div style={{position: 'relative', minHeight: '300px', borderRadius: '20px', border: '1px solid #888'}}>
          {file && <img src={URL.createObjectURL(file)} alt="" />}
          <p style={{textAlign: 'center'}}>Выберите файл</p>
          <input accept='image/*' style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0'}} type="file" onChange={e => {
            setFile(e.target.files?.[0])
          }} />
        </div>
      </div>
      <div>
        <p>Описание</p>
        <textarea style={{width: '100%', minHeight: '400px', border: '1px solid #888', borderRadius: '20px', padding: '10px', resize: 'vertical'}} placeholder='Введите описание'></textarea>
      </div>
    </div>
  )
}

export default NewPost