import { Transition } from "@headlessui/react";
import React, { FC, Fragment, useEffect, useState } from "react";

type BackdropProps = {
    doClose?: () => any;
    className?: string;
    static?: boolean;
    opened?: boolean;
};

export const Backdrop: FC<BackdropProps> = (props) => {
    const [open, setOpen] = useState(true);

    const doClose = async () => {
        if (props.static) return;

        if (props.doClose) props.doClose();
        setOpen(false);
    };

    useEffect(() => {
        if (props.opened !== undefined) {
            setOpen(props.opened);
        }
    }, [props.opened]);

    return (
        <Transition appear show={open} as="div">
            <Transition.Child
                as="div"
                enter="ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className={`h-screen w-screen absolute inset-0 z-50`}>
                    <div
                        className={`${props.className} h-full w-full relative flex`}>
                        <div className="z-10">{props.children}</div>
                        <div
                            onClick={doClose}
                            className={`absolute h-full w-full bg-black bg-opacity-75 backdrop-blur-sm z-0`}></div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};
