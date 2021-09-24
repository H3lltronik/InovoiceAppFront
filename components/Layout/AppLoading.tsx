import React, { useEffect } from "react";
import { useStore } from "../../store";
import { Backdrop } from "../Dialog/Backdrop";

export const AppLoading = () => {
    const appLoading = useStore((state) => state.appLoading);
    const setAppLoading = useStore((state) => state.setAppLoading);

    return (
        <>
            <Backdrop
                static={true}
                opened={appLoading}
                className={`items-center justify-center`}>
                <div className="text-white text-2xl">
                    {appLoading ? "Loading..." : "buat"}
                </div>
            </Backdrop>
        </>
    );
};
