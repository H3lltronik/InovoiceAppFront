import React, { FC } from 'react'

type ButtonProps = {
    text: string,
    appendIcon?: 'plus',
    onClick: () => void,
}

export const Button: FC<ButtonProps> = (props) => {
    return (
        <button className={`bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark
        font-bold rounded-full pl-2 h-14 
        ${props.appendIcon? 'pr-5':'pr-2'}`}
        onClick={props.onClick}
        >
            <div className="flex items-center justify-center">
                {
                    props.appendIcon?
                    <div className="bg-white rounded-full flex mr-4">
                        <div className="m-auto p-3">
                            <img className="w-5 h-5" src="/icon-plus.svg" alt="" />
                        </div>
                    </div>
                    :null
                }
                <div className="text-regular">{props.text}</div>
            </div>
        </button>
    )
}