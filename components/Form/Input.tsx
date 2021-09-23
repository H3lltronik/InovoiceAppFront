import React, { FC, useEffect, useReducer, useState } from 'react'
import { Box } from './Box'

type InputProps = {
    className?: string
    boxClassName?: string
    type?: string
    validation?: any
    value?: any
    onChange?: (value: any) => any
    append?: React.ReactNode
    showError?: boolean
    errorMessage?: string
}
export const Input: FC<InputProps> = (props) => {
    const [value, setValue] = useState("")
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        if (props.value) {
            setValue(props.value)
            forceUpdate() // OMG I think I hate React
        }
    }, [props])

    const onChange = (eVal: string) => {
        setValue (eVal)
        if (props.onChange) 
            props.onChange(eVal)
    }

    return (
        <Box className={`${props.boxClassName}`}>
            <input {...props.validation} 
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`${props.className} bg-transparent w-full text-white focus:outline-none h-full px-2 text-xs`} 
            type={`${props.type ?? 'text'}`} />
            {props.append}
            {props.showError && <div className="text-xs text-red-500 mt-1">{props.errorMessage}</div>}
        </Box>
    )
}
