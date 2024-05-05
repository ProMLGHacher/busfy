import React from 'react';
import styles from './Input.module.scss'
import { classNames } from '../../lib/classNames/classNames';

export const Input = (props: {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string | number | readonly string[] | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    icon?: React.ReactNode;
    className?: string;
}) => {
  return (
    <label className={classNames(styles.inputContainer, undefined, [props.className])}>
        {props.icon && React.cloneElement(props.icon as React.ReactElement, { className: styles.icon })}
        <input className={classNames(styles.input, {
            [styles.withIcon]: Boolean(props.icon)
        })} value={props.value} onChange={props.onChange} type={props.type} placeholder={props.placeholder} />
    </label>
  )
}
