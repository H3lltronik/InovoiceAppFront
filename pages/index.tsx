import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { getInvoices } from "../api";
import { NewInvoice } from "../components/Dialog";
import { Button } from "../components/Form/Button";
import { RadioDropDown } from "../components/Form/RadioDropDown";
import { PageGuard } from "../components/Guard/PageGuard";
import InvoiceItemList from "../components/Invoice/InvoiceItemList";
import { AppLayout } from "../components/Layout/AppLayout";
import { useStore } from "../store";

const Home: NextPage = () => {
    const setStoreInvoices = useStore((state) => state.setInvoices);
    const invoices = useStore((state) => state.filteredInvoices);

    useEffect(() => {
        (async function () {
            const test = await getInvoices();
            if (test.data) setStoreInvoices(test.data);
        })();
    }, []);

    return (
        <AppLayout className="pb-10">
            <Head>
                <title>H3lltronik | Invoice App</title>
            </Head>

            <div className="flex">
                <div className="">
                    <h1 className="text-lg md:text-3xl font-bold text-black dark:text-white">
                        Invoices
                    </h1>
                    {invoices.length > 0 && (
                        <p className="font-normal text-xs text-gray-light dark:text-white-dark mt-1">
                            <span className="hidden md:inline">There are </span>
                            <span className="">
                                <span>{invoices.length}</span>
                                <span className="hidden md:inline"> total</span>
                                <span> invoices</span>
                            </span>
                        </p>
                    )}
                    {invoices.length == 0 && (
                        <p className="font-normal text-xs text-gray-dark dark:text-white-dark mt-1">
                            <span className="">No Invoices</span>
                        </p>
                    )}
                </div>

                <div className="flex-grow"></div>

                <div className="flex items-center">
                    <RadioDropDown className="hidden xs:block"></RadioDropDown>
                    <NewInvoice>
                        <Button
                            className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                            appendIcon="plus"
                            onClick={() => {}}>
                            <div className="">
                                <span className="">New</span>
                                <span className="hidden md:inline">
                                    {" "}
                                    Invoice
                                </span>
                            </div>
                        </Button>
                    </NewInvoice>
                </div>
            </div>
            <div className="flex xs:hidden mt-5 justify-center">
                <RadioDropDown className=""></RadioDropDown>
            </div>

            <section className="flex flex-col gap-5 mt-5 md:mt-14">
                {invoices.map((invoice, i) => {
                    return <InvoiceItemList data={invoice} key={i} />;
                })}

                {invoices.length <= 0 && (
                    <div className="w-60 mx-auto mt-10 lg:mt-28">
                        <img
                            className="w-full"
                            src="/illustration-empty.svg"
                            alt=""
                        />

                        <div className="mt-10">
                            <h2 className="text-black dark:text-white-dark text-xl font-bold text-center">
                                There is nothing here
                            </h2>

                            <p className="text-gray-light dark:text-white-dark text-xs text-center mt-5">
                                Create a new invoice by clicking the
                                <b> New Invoice</b> button and get started
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </AppLayout>
    );
};

export default PageGuard(Home, {});
