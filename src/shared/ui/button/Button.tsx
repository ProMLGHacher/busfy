import { classNames } from '../../lib/classNames/classNames'
import styles from './Button.module.scss'

export const Button = (
    { children, type = 'button', className, onClick, disabled }:
        {
            children: React.ReactNode,
            type?: 'button' | 'submit' | 'reset',
            className?: string,
            onClick?: () => void,
            disabled?: boolean
        }
) => {
    return (
        <button onClick={onClick} className={classNames(styles.button, {
            [styles.disabled]: disabled
        }, [className])} type={type}>
            {children}
        </button>
    )
}
