import React, { FC } from 'react'

type BackdropProps = {

}
export const Backdrop: FC<BackdropProps> = (props) => {
    return (
        <div className={`h-screen w-screen absolute inset-0 bg-black bg-opacity-75`}>
            {props.children}
        </div>
    )
}
