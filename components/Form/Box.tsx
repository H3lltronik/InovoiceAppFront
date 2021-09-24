import React, { FC } from 'react'

type BoxProps = {
    className?: string
}
export const Box: FC<BoxProps> = (props) => {
    return (
        <div className={`dark:bg-blue-darker dark:border-blue-dark 
        bg-white-light border-gray-light border-opacity-50
        rounded-md border h-12
        ${props.className}`}>
            {props.children}
        </div>
    )
}
