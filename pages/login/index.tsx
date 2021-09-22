import { NextPage } from "next";
import React, { useRef } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { AppLayout } from "../../components/Layout/AppLayout";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { login } from "../../api";
import Router from "next/router";

const Login: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({mode: 'onChange'});
    const onSubmit = async (data: any) => {
        const result = await login({
            username: data.username,
            password: data.password,
        })
        if (!result.error) {
            Router.push("/");
        }
    };

    const doSubmit = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <AppLayout className="h-screen flex items-start md:items-center justify-center">
            <div className="bg-blue-dark rounded-lg p-5 flex flex-col items-center">
                <h1 className="text-white text-3xl mt-3">Invoice App</h1>
                <h1 className="text-white text-xl mt-3">Login</h1>

                <form className="w-full md:w-96 text-center mt-10" >
                    <div className={``}>
                        <div className={`text-xs text-white-dark mb-2`}>Username</div>
                        <Input validation={ {...register("username", { required: true })}} value="john" key="username"></Input>
                        {errors.username && <div className={`text-xs text-red-500 mb-2`}>Required field</div>}
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs text-white-dark mb-2`}>Password</div>
                        <Input validation={ {...register("password", { required: true })}} type="password" value="changeme123" key="password"></Input>
                        {errors.password && <div className={`text-xs text-red-500 mb-2`}>Required field</div>}
                    </div>

                    <div className="flex justify-center gap-5 mt-10">
                        <Link href="/register" passHref={true}>
                            <Button
                                className="bg-black-light text-white hover:bg-purple-light active:bg-purple-dark"
                                onClick={() => {}}>
                                <div className="">
                                    <span className="">Register</span>
                                </div>
                            </Button>
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

export default Login;
