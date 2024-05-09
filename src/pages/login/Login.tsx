import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { Input } from '../../shared/ui/input/Input'
import { Arrow, Lock, Mail } from '../../shared/consts/images'
import { Button } from '../../shared/ui/button/Button'
import { classNames } from '../../shared/lib/classNames/classNames'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/storeHooks'
import { loginThunk } from '../../features/authorization/loginThunk'
import { Loader } from '../../shared/ui/loader/Loader'

export const Login = () => {

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginThunk({email: mail, password: password}))
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Войти в аккаунт</h1>
        <p className={styles.loginDescription}>Войдите в аккаунт чтобы войти в приложение</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input style={{width: '100%'}} value={mail} onChange={(e) => setMail(e.target.value)} type="email" placeholder="Email" icon={<Mail />} />
          <Input style={{width: '100%'}} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" icon={<Lock />} />
          <Button type="submit">
            {isLoading ? <Loader /> : 'Войти'}
            <Arrow />
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p>Ещё нет аккаунта? <Link to="/registration" className={styles.loginFooterLink}>Зарегистрироваться</Link></p>
        <Link to="/reset-password" className={classNames(styles.loginFooterLink, undefined, [styles.resetPassword])}>Забыли пароль?</Link>
      </div>
    </div>
  )
}
