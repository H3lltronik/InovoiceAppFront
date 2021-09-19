import Tippy from "@tippyjs/react";
import React, { FC } from "react";
import 'tippy.js/animations/shift-away.css';
import "tippy.js/dist/tippy.css";

type PopoverProps = {
    popover: React.ReactNode,
};

export const Popover: FC<PopoverProps> = (props) => {

    return (
        <div className={`relative tippy-root h-full`}>
            <Tippy 
            content={props.popover}
            interactive={true} 
            interactiveBorder={20} 
            placement='bottom' 
            trigger='click' 
            animation= 'shift-away'
            arrow={false}
            className="tippy-select-box w-full">
                {props.children}
            </Tippy>

            
        </div>
    );
};
