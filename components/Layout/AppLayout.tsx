import React, { FC } from "react";
import AppBar from "../AppBar/AppBar";

type AppLayout = {}
export const AppLayout: FC<AppLayout> = (props) => {
    return (
        <div className="relative">
            <AppBar></AppBar>
            {/* <NewInvoice></NewInvoice> */}
            <main className="container mx-auto pt-12">
                {props.children}
            </main>
        </div>
    );
};
