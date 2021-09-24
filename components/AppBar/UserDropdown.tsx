import React, { FC, useRef } from "react";
import { Menu } from "@headlessui/react";
import { logout, serverUrl } from "../../api";
import Router from "next/router";
import { useStore } from "../../store";
import { ProfilePicture, ProfilePictureElement } from "../Form/ProfilePicture";

type UserDropdownProps = {
    profilePictureRef: any;
};
export const UserDropdown: FC<UserDropdownProps> = (props) => {
    const user = useStore((state) => state.user);
    const resetStore = useStore((state) => state.resetStore);

    const options = [
        {
            item: <div>Change picture</div>,
            action: () => {
                props.profilePictureRef.current?.openModal();
            },
        },
        {
            item: <div>Log out</div>,
            action: async () => {
                await logout();
                resetStore();

                Router.push("/login");
            },
        },
    ];
    const getItems = () => {
        return (
            <>
                {options.map((item, index) => {
                    return (
                        <Menu.Item
                            as="button"
                            key={index}
                            onClick={item.action}
                            className="block w-full">
                            {({ active }) => (
                                <div
                                    className={`text-black dark:text-white border-gray-light dark:border-blue-darker font-bold
                                            px-3 text-sm py-3 w-full
                                            ${
                                                index + 1 < options.length
                                                    ? "border-b"
                                                    : null
                                            } 
                                            ${active && "bg-purple-dark"}
                                            `}>
                                    <div className="pointer-events-none">
                                        {item.item}
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                    );
                })}
            </>
        );
    };

    const getProfilePic = () => {
        if (user) return `${user?.profilePicture}`;

        return `/no-picture.jpg`;
    };

    return (
        <div className="relative">
            <Menu>
                <Menu.Button className="flex h-full w-full items-center pl-2 text-xs">
                    <div
                        className="relative w-28 h-full lg:h-28 lg:w-full 
                        border-l-2 lg:border-l-0 lg:border-t-2 border-gray-100 border-opacity-10
                        ">
                        <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={getProfilePic()}
                                alt="Avatar"
                            />
                        </div>
                    </div>
                </Menu.Button>
                <Menu.Items
                    className={`bg-white dark:bg-blue-dark rounded-xl ring-1 
                    overflow-hidden top-full mt-2 right-3 lg:right-0 lg:left-full lg:top-0 lg:ml-2 lg:mt-0 absolute w-48
                    ${!user && "hidden"}`}>
                    {getItems()}
                </Menu.Items>
            </Menu>
        </div>
    );
};
