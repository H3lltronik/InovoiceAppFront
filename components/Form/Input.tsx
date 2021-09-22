import React, { FC } from 'react'
import { Box } from './Box'

type InputProps = {
    className?: string
    boxClassName?: string
    type?: string
}
export const Input: FC<InputProps> = (props) => {
    return (
        <Box className={`${props.boxClassName}`}>
            <input className={`${props.className} bg-transparent w-full text-white focus:outline-none h-full px-2`} 
            type={`${props.type ?? 'text'}`} />
        </Box>
    )
}
