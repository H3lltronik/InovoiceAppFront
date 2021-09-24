import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { AppLayout } from "../../components/Layout/AppLayout";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { PageUnguard } from "../../components/Guard/PageUnguard";
import { createUser, login } from "../../api";
import { useStore } from "../../store";
import Router from "next/router";

const Register: NextPage = () => {
    const setAppLoading = useStore(state => state.setAppLoading)
    const { handleSubmit, control } = useForm({mode: 'onChange'});
    const [error, setError] = useState<string|null>(null)

    const onSubmit = async (data: any) => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords doesn't match");
            return;
        }

        setAppLoading(true)
        const resultRegister = await createUser(data);
        
        if (resultRegister.error) {
            console.error("Something went wrong", resultRegister.error)
            return
        }

        const resultLogin = await login({
            username: data.username,
            password: data.password,
        })
        
        setAppLoading(false)
        if (!resultLogin.error) {
            Router.push("/");
        }

        setError(null);
    };

    const doSubmit = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <AppLayout className="h-screen flex items-start md:items-center justify-center">
            <div className="bg-white dark:bg-blue-dark rounded-lg p-5 flex flex-col items-center w-full md:w-auto">
                <h1 className="dark:text-white text-3xl mt-3">Invoice App</h1>
                <h2 className="dark:text-white text-xl mt-3">Register</h2>
                {error && <h2 className="text-xs text-red-500 mt-2">{error}</h2>}

                <form className="w-full lg:w-96 text-center mt-10" >
                    <div className={``}>
                        <div className={`text-xs dark:text-white-dark mb-2`}>Username</div>
                        <Input rules={{required: true}} control={control} name="username" key="username"></Input>
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs dark:text-white-dark mb-2`}>Password</div>
                        <Input rules={{required: true}} control={control} name="password" key="password"></Input>
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs dark:text-white-dark mb-2`}>Confirm password</div>
                        <Input rules={{required: true }} control={control} name="confirmPassword" key="confirmPassword"></Input>
                    </div>

                    <div className="flex justify-center gap-5 mt-10">
                        <Link href="/login" passHref={true}>
                            <div className="">
                                <Button
                                    className="bg-black-light text-white hover:bg-purple-light active:bg-purple-dark"
                                    onClick={() => {}}>
                                    <div className="">
                                        <span className="">Login</span>
                                    </div>
                                </Button>
                            </div>
                        </Link>
                        <Button
                            className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                            onClick={doSubmit}>
                            <div className="">
                                <span className="">Register</span>
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default PageUnguard(Register, {});