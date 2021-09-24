import { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { AppLayout } from "../../components/Layout/AppLayout";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { login } from "../../api";
import Router from "next/router";
import { PageUnguard } from "../../components/Guard/PageUnguard";
import { useStore } from "../../store";

const Login: NextPage = () => {
    const setAppLoading = useStore(state => state.setAppLoading)
    const { handleSubmit, control } = useForm({mode: 'onChange'});
    const onSubmit = async (data: any) => {
        const result = await login({
            username: data.username,
            password: data.password,
        })
        setAppLoading(false)
        if (!result.error) {
            Router.push("/");
        }
    };

    const doSubmit = () => {
        setAppLoading(true)
        handleSubmit(onSubmit)();
    }

    useEffect(() => {
    }, [])

    return (
        <AppLayout className="h-screen flex items-start md:items-center justify-center">
            <div className="bg-white dark:bg-blue-dark rounded-lg p-5 flex flex-col items-center">
                <h1 className="dark:text-white text-3xl mt-3">Invoice App</h1>
                <h1 className="dark:text-white text-xl mt-3">Login</h1>

                <form className="w-full md:w-96 text-center mt-10" >
                    <div className={``}>
                        <div className={`text-xs dark:text-white-dark mb-2`}>Username</div>
                        <Input rules={{required: true}} control={control} name="username" value="john" key="username"></Input>
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs dark:text-white-dark mb-2`}>Password</div>
                        <Input rules={{required: true}} control={control} name="password" value="changeme123" type="password" key="password"></Input>
                    </div>

                    <div className="flex justify-center gap-5 mt-10">
                        <Link href="/register" passHref={true}>
                            <div className="">
                                <Button
                                    className="bg-black-light text-white hover:bg-purple-light active:bg-purple-dark"
                                    onClick={() => {}}>
                                    <div className="">
                                        <span className="">Register</span>
                                    </div>
                                </Button>
                            </div>
                        </Link>
                        <Button
                            className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                            onClick={doSubmit}>
                            <div className="">
                                <span className="">Login</span>
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default PageUnguard(Login, {});