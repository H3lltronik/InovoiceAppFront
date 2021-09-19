import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react'

type BackdropProps = {
    doClose: () => any
}

export const Backdrop: FC<BackdropProps> = (props) => {
    const [open, setOpen] = useState(true);
    const control = useAnimation();

    const doClose = async () => {
        props.doClose();
        await control.start({
            opacity: 0,
            transition: {
                duration: 1
            },
        });
        setOpen(false);
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            {
                open?
                <div className={`h-screen w-screen absolute inset-0 z-10`}>
                    <div className="h-full w-full relative flex">
                        {props.children}
                        <motion.div onClick={doClose} className={`absolute h-full w-full bg-black bg-opacity-75 backdrop-blur-sm z-0`}
                        initial={{opacity: 1}} animate={control}></motion.div>
                    </div>
                </div>
                :null
            }
        </>
    )
}
