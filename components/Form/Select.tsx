import React, { FC } from 'react'
import { Box } from './Box'
import { Popover } from './Popover'

type SelectItem = {
    text: string,
    value: any
}
type SelectProps = {
    label: string,
    items: SelectItem[]
}
export const Select:FC<SelectProps> = (props) => {
    
    const getContent = () => {
        return <button className="flex items-center px-4 w-full h-full">
            <div className="text-sm text-white mr-4 font-bold">
                <span>{props.label}</span>
            </div>
            <div className="flex-grow"></div>
            <div className="">
                <img src="/icon-arrow-down.svg" alt="" />
            </div>
        </button>
    }

    const selectValue = () => {
        
    }

    const getPopover = () => {
        return <div className="bg-blue-dark text-white
        font-bold rounded-xl shadow-xl w-full">
            {
                props.items.map((item, index) => {
                    return <div className="" key={index}>
                        <button className={`border-blue-darker hover:bg-blue-darker hover:bg-opacity-25
                        px-3 text-sm py-3 w-full
                        ${index+1 < props.items.length? 'border-b-2':null}`}
                        onClick={selectValue}>
                            <span>{item.text}</span>
                        </button>
                    </div>
                })
            }
        </div>
    }

    return (
        <div>
            <Box>
                <Popover popover={getPopover()}>{getContent()}</Popover>
            </Box>
        </div>
    )
}
