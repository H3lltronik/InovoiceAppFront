import type { NextPage } from "next";
import { useEffect } from "react";
import { getInvoices } from "../api";
import AppBar from "../components/AppBar/AppBar";
import { NewInvoice } from "../components/Dialog";
import { Button } from "../components/Form/Button";
import { RadioDropDown } from "../components/Form/RadioDropDown";
import { PageGuard } from "../components/Guard/PageGuard";
import InvoiceItemList from "../components/Invoice/InvoiceItemList";
import { AppLayout } from "../components/Layout/AppLayout";
import {useStore} from '../store'

const Home: NextPage = () => {
    const addInvoice = useStore(state => state.addInvoice);
    const invoices = useStore(state => state.invoices);

    useEffect(() => {
        (async function () {
            const test = await getInvoices();
            console.log("from api", test.data)
            test.data?.forEach(invoice => {
                console.log("a", invoice)
                addInvoice(invoice);
            })
        })()
    }, [])

    return (
        <AppLayout>
            <div className="flex">
                <div className="">
                    <h1 className="text-lg md:text-3xl font-bold text-white">
                        Invoices
                    </h1>
                    <p className="font-normal text-xs text-white-dark mt-1">
                        <span className="hidden md:inline">There are </span>
                        <span className="">
                            <span>7</span>
                            <span className="hidden md:inline"> total</span>
                            <span> invoices</span>
                        </span>
                    </p>
                </div>

                <div className="flex-grow"></div>

                <div className="flex items-center">
                    <RadioDropDown className="hidden xs:block"></RadioDropDown>
                    <Button
                        className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                        appendIcon="plus"
                        onClick={() => {}}>
                        <div className="">
                            <span className="">New</span>
                            <span className="hidden md:inline"> Invoice</span>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex xs:hidden mt-5 justify-center">
              <RadioDropDown className=""></RadioDropDown>
            </div>

            <section className="flex flex-col gap-5 mt-5 md:mt-14">
                {invoices.map((invoice, i) => {
                    return <InvoiceItemList data={invoice} key={i} />;
                })}
            </section>
        </AppLayout>
    );
};

export default PageGuard(Home, {});
