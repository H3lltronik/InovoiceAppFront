import React, { FC } from 'react'

type ButtonProps = {
    appendIcon?: 'plus',
    className?: string,
    onClick: () => void,
    disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    return (
        <button disabled={!!props.disabled} type={'button'} className={`font-bold rounded-full h-12 flex items-center text-sm
            ${props.className}
            ${props.disabled && 'opacity-50'}
            ${props.appendIcon? 'pl-2 pr-5':'px-7'}`
        }
        onClick={props.onClick}
        >
            <div className="flex items-center justify-center">
                {
                    props.appendIcon?
                    <div className="bg-white rounded-full flex mr-4">
                        <div className="m-auto p-2">
                            <img className="w-5 h-5" src="/icon-plus.svg" alt="" />
                        </div>
                    </div>
                    :null
                }
                <div className="text-regular">{props.children}</div>
            </div>
        </button>
    )
}