import { classNames } from '../../lib/classNames/classNames'
import styles from './Button.module.scss'

export const Button = ({ children, type = 'button', className, onClick }: { children: React.ReactNode, type?: 'button' | 'submit' | 'reset', className?: string, onClick?: () => void }) => {
    return (
        <button onClick={onClick} className={classNames(styles.button, undefined, [className])} type={type}>
            {children}
        </button>
    )
}
