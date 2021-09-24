import React, { useEffect, useState } from "react";
import Router from "next/router";
import { checkUser, login } from "../../api";

type Options = {
    pathAfterFailure?: string;
};

export const PageUnguard = (Component: any = null, options: Options) => {
    const UnAuthenticatedRoute = (props: any) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            (async function () {
                const result = await checkUser();
                
                if (!result.error)
                    Router.push(options.pathAfterFailure || "/");
                
                setLoading(false)
            })();
        }, []);

        if (loading) {
            return <div />;
        }

        return <Component {...props}/>;
    };

    return UnAuthenticatedRoute;
};
