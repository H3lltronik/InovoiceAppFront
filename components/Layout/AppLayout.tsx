import React, { FC } from "react";
import AppBar from "../AppBar/AppBar";

type AppLayout = {
    outside?: React.ReactNode
}
export const AppLayout: FC<AppLayout> = (props) => {
    return (
        <div className="relative">
            <AppBar></AppBar>
            <div className="layout">
                <main className="container mx-auto pt-12 px-10 md:px-0">
                    {props.children}
                </main>
                {props.outside? props.outside:null}
            </div>
        </div>
    );
};
