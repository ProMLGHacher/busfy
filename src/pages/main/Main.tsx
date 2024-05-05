import { Link, NavLink, Outlet } from 'react-router-dom'
import styles from './Main.module.scss'
import { classNames } from '../../shared/lib/classNames/classNames'
import { mainNavigation } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/storeHooks'
import { User } from '../../shared/consts/images'

export const Main = () => {

    const user = useAppSelector(state => state.auth.user)

    return (
        <div className={styles.wrapper}>
            <nav className={styles.navigation}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'red',
                        borderRadius: '50%'
                    }}></div>
                    <h2>Busfy</h2>
                </div>
                <div className={styles.navigationItems}>
                    {mainNavigation.map((item) => (
                        <NavLink to={item.path} className={({ isActive }) => {
                            return classNames(styles.navigationItem, {
                                [styles.navigationItemActive]: isActive
                            })
                        }} key={item.title}>
                            {item.icon}
                            <p>{item.title}</p>
                        </NavLink>
                    ))}
                </div>
                <div className={styles.user}>
                    {user?.urlIcon ? <img src={user?.urlIcon} alt="avatar" /> : <User />}
                    <Link className={styles.userLink} to={user ? '/profile' : '/login'}>{user?.nickname || 'Войти'}</Link>
                </div>
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
