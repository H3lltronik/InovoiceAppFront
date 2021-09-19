import React, { FC } from 'react'

type BoxProps = {
    className?: string
}
export const Box: FC<BoxProps> = (props) => {
    return (
        <div className={`bg-blue-darker border-blue-dark 
        rounded-md border-2 h-12
        ${props.className}`}>
            {props.children}
        </div>
    )
}
