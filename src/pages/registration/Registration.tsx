import { Link } from 'react-router-dom'
import styles from './Registration.module.scss'
import { Input } from '../../shared/ui/input/Input'
import { Arrow, Lock, Mail, User } from '../../shared/consts/images'
import { Button } from '../../shared/ui/button/Button'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/storeHooks'
import { Loader } from '../../shared/ui/loader/Loader'
import { signUpThunk } from '../../features/authorization/signUpThunk'
import { confirmSignUpThunk } from '../../features/authorization/confirmSignUpThunk'

export const Registration = () => {

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (code) {
      dispatch(confirmSignUpThunk({ email: mail, confirmationCode: code }))
    } else {
      dispatch(signUpThunk({ email: mail, nickname: name, password: password }))
    }
  }

  const sendCode = () => {
    dispatch(signUpThunk({ email: mail, nickname: name, password: password }))
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Создать аккаунт</h1>
        <p className={styles.loginDescription}>Создайте аккаунт чтобы войти в приложение</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input style={{width: '100%'}} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Имя" icon={<User />} />
          <Input style={{width: '100%'}} value={mail} onChange={(e) => setMail(e.target.value)} type="email" placeholder="Email" icon={<Mail />} />
          <Input style={{width: '100%'}} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" icon={<Lock />} />
          <div className={styles.codeForm}>
            <Input className={styles.codeInput} value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Код подтверждения" />
            <Button onClick={sendCode} className={styles.codeButton} type="button">
              {isLoading ? <Loader /> : 'Получить'}
              <Arrow />
            </Button>
          </div>
          <Button type="submit">
            {isLoading ? <Loader /> : 'Зарегистрироваться'}
            <Arrow />
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p>Уже есть аккаунт? <Link to="/login" className={styles.loginFooterLink}>Войти</Link></p>
      </div>
    </div>
  )
}
