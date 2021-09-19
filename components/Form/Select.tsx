import React, { FC } from "react";
import { Box } from "./Box";
import { Menu } from "@headlessui/react";

type SelectItem = {
    text: string;
    value: any;
};
type SelectProps = {
    label: string;
    items: SelectItem[];
};
export const Select: FC<SelectProps> = (props) => {
    const getContent = () => {
        return (
            <button className="flex items-center px-4 w-full h-full">
                <div className="text-sm text-white mr-4 font-bold">
                    <span>{props.label}</span>
                </div>
                <div className="flex-grow"></div>
                <div className="">
                    <img src="/icon-arrow-down.svg" alt="" />
                </div>
            </button>
        );
    };

    const selectValue = () => {};

    const getItems = () => {
        return (
            <>
                {props.items.map((item, index) => {
                    return (
                        <Menu.Item as="div" key={index}>
                            {({ active }) => (
                                <div
                                    className={`border-blue-darker 
                                            px-3 text-sm py-3 w-full
                                            ${
                                                index + 1 < props.items.length
                                                    ? "border-b-2"
                                                    : null
                                            } 
                                            ${active && "bg-purple-dark"}`}>
                                    <a href="/account-settings">
                                        Account settings
                                    </a>
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
                    <Menu.Button className="flex h-full w-full items-center pl-2">
                        <span>More</span>
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
