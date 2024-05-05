import { useAppDispatch } from '../../app/store/storeHooks'
import { logOut } from '../../features/authorization/authSlice'
import { Button } from '../../shared/ui/button/Button'
import styles from './Profile.module.scss'

export const Profile = () => {

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logOut())
    }

  return (
    <div className={styles.profile}>
        <Button onClick={logout}>
            Logout
        </Button>
    </div>
  )
}
