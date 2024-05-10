import { classNames } from '../../lib/classNames/classNames'
import styles from './Button.module.scss'

export const Button = (
    { children, type = 'button', className, onClick, disabled, style }:
        {
            children: React.ReactNode,
            type?: 'button' | 'submit' | 'reset',
            className?: string,
            onClick?: () => void,
            disabled?: boolean,
            style?: React.CSSProperties
        }
) => {
    return (
        <button onClick={onClick} style={style} className={classNames(styles.button, {
            [styles.disabled]: disabled
        }, [className])} type={type}>
            {children}
        </button>
    )
}
