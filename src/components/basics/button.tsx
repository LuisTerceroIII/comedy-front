import React from 'react'

interface ButtonProps {
    type?: 'reset' | 'submit'
    text: string
    className?: string
    onClick?: () => void
}

export const Button:React.FunctionComponent<ButtonProps> = (props) => {
    const {type="submit", text="Press", onClick, className} = props
    const onPress = () => {
        if(onClick != null && typeof onClick === 'function') onClick()
    }
    return (
        <button className={`${className}`} onClick={onPress} type={type}>{text}</button>
    )
}
