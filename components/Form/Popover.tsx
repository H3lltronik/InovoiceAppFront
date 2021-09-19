import React, { FC } from "react";
import { Menu } from "@headlessui/react";

type PopoverProps = {
    popover: React.ReactNode;
};

export const Popover: FC<PopoverProps> = (props) => {
    return (
        <div className="">
            <Menu>
                <Menu.Button>More</Menu.Button>
                <Menu.Items className={`bg-blue-darker rounded-xl mt-10 ring-1 overflow-hidden`}>
                    {[1, 1, 1].map((_, i) => {
                        return (
                            <Menu.Item as="div" key={i}>
                                {({ active }) => (
                                    <div className={`p-2 
                                            ${active && "bg-purple-dark"}`
                                        }>
                                        <a
                                            href="/account-settings">
                                            Account settings
                                        </a>
                                    </div>
                                )}
                            </Menu.Item>
                        );
                    })}
                </Menu.Items>
            </Menu>
        </div>
    );
};
