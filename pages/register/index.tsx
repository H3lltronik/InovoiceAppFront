import { NextPage } from "next";
import React, { useRef } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { AppLayout } from "../../components/Layout/AppLayout";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { PageUnguard } from "../../components/Guard/PageUnguard";

const Register: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({mode: 'onChange'});
    const onSubmit = (data: any) => {
    };

    const doSubmit = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <AppLayout className="h-screen flex items-center justify-center">
            <div className="bg-blue-dark rounded-lg p-5 flex flex-col items-center">
                <h1 className="text-white text-3xl mt-3">Invoice App</h1>
                <h1 className="text-white text-xl mt-3">Register</h1>

                <form className="w-96 text-center mt-10" >
                    <div className={``}>
                        <div className={`text-xs text-white-dark mb-2`}>Username</div>
                        <Input validation={ {...register("username", { required: true })}} key="username"></Input>
                        {errors.username && <div className={`text-xs text-red-500 mb-2`}>Required field</div>}
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs text-white-dark mb-2`}>Password</div>
                        <Input validation={ {...register("password", { required: true })}} type="password" key="password"></Input>
                        {errors.password && <div className={`text-xs text-red-500 mb-2`}>Required field</div>}
                    </div>
                    <div className={`mt-10`}>
                        <div className={`text-xs text-white-dark mb-2`}>Confirm password</div>
                        <Input validation={ {...register("password", { required: true })}} type="password" key="password-confirm"></Input>
                        {errors.password && <div className={`text-xs text-red-500 mb-2`}>Required field</div>}
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