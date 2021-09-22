import React, { useEffect, useState } from "react";
import Router from "next/router";
import { checkUser, login } from "../../api";

type Options = {
    pathAfterFailure?: string;
};

export const PageGuard = (Component: any = null, options: Options) => {
    const AuthenticatedRoute = (props: any) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            (async function () {
                const result = await checkUser();
                
                if (result.error)
                    Router.push(options.pathAfterFailure || "/login");
                
                setLoading(false)
            })();
        }, []);

        if (loading) {
            return <div />;
        }

        return <Component {...props}/>;
    };

    return AuthenticatedRoute;
};
