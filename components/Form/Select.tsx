import React, { FC, useEffect, useState } from "react";
import { Box } from "./Box";
import { Menu } from "@headlessui/react";

type SelectItem = {
    text: string;
    value: any;
};
type SelectProps = {
    label: string;
    items: SelectItem[];
    value?: string|number,
};
export const Select: FC<SelectProps> = (props) => {
    const [selected, setSelected] = useState<SelectItem|null>(null);

    useEffect(() => {
        setSelected(props.items[0])
        
        if (props.value) {
            const propsSelected = props.items.find(i => i.value == props.value)
            if (propsSelected)
                setSelected(propsSelected)
        }
    }, [])
    
    const doSelect = (item: SelectItem) => {
        setSelected(item)
    }

    const getItems = () => {
        return (
            <>
                {props.items.map((item, index) => {
                    return (
                        <Menu.Item as="button" key={index} onClick={() => doSelect(item)} className="block w-full">
                            {({ active }) => (
                                <div
                                    className={`border-blue-darker pointer-events-none
                                            px-3 text-sm py-3 w-full
                                            ${
                                                index + 1 < props.items.length
                                                    ? "border-b-2"
                                                    : null
                                            } 
                                            ${active && "bg-purple-dark"}
                                            ${(selected == item) && !active && 'bg-purple-light'}
                                            `}>
                                    <div className="pointer-events-none">
                                        {item.text}
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                    );
                })}
            </>
        );
    };

    return (
        <div>
            <Box>
                <Menu>
                    <Menu.Button className="flex h-full w-full items-center pl-2 text-xs">
                        <span>{selected?.text}</span>
                    </Menu.Button>
                    <Menu.Items
                        className={`bg-blue-dark rounded-xl mt-5 ring-1 overflow-hidden`}>
                        {getItems()}
                    </Menu.Items>
                </Menu>
            </Box>
        </div>
    );
};
