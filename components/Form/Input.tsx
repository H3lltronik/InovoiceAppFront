import React, { FC } from 'react'
import { Box } from './Box'

type InputProps = {
    className?: string
    boxClassName?: string
    type?: string
    validation?: any
    value?: any
    onChange?: (value: any) => any
}
export const Input: FC<InputProps> = (props) => {
    return (
        <Box className={`${props.boxClassName}`}>
            <input {...props.validation} 
            defaultValue={props.value}
            onChange={e => { if (props.onChange) props.onChange(e.target.value) }}
            className={`${props.className} bg-transparent w-full text-white focus:outline-none h-full px-2 text-xs`} 
            type={`${props.type ?? 'text'}`} />
        </Box>
    )
}
