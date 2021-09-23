import React, { useEffect, useState } from "react";
import Router from "next/router";
import { checkUser, login } from "../../api";
import { useStore } from "../../store";

type Options = {
    pathAfterFailure?: string;
};

export const PageGuard = (Component: any = null, options: Options) => {
    const AuthenticatedRoute = (props: any) => {
        const [loading, setLoading] = useState(true);
        const setUser = useStore((state) => state.setUser);

        useEffect(() => {
            (async function () {
                const result = await checkUser();

                if (result.error || !result.data) {
                    Router.push(options.pathAfterFailure || "/login");
                } else {
                    setUser(result.data);
                }

                setLoading(false);
            })();
        }, []);

        if (loading) {
            return <div />;
        }

        return <Component {...props} />;
    };

    return AuthenticatedRoute;
};
