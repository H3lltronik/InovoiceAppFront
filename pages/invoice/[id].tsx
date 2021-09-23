import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getInvoice, updateInvoice } from "../../api";
import { NewInvoice } from "../../components/Dialog";
import { Delete } from "../../components/Dialog/Delete";
import { Button } from "../../components/Form/Button";
import { PageGuard } from "../../components/Guard/PageGuard";
import {
    BadgeStatus,
    InvoiceBadge,
} from "../../components/Invoice/InvoiceBadge";
import { AppLayout } from "../../components/Layout/AppLayout";
import { dateFormat, moneyStringFormat } from "../../lib/lib";
import { useStore } from "../../store";
import { Invoice } from "../../store/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id;
    return {
        props: {
            id,
        },
    };
};

const Details: NextPage = (props) => {
    const invoice = useStore(state => state.invoiceDetails);
    const setInvoice = useStore(state => state.setInvoiceDetails);
    const setInvoiceForm = useStore(state => state.setInvoiceForm);

    useEffect(() => {
        (async function () {
            if (!props.id) return;
            const invoice = (await getInvoice(props.id)).data;
            setInvoice(invoice);
        })();
    }, []);

    const markAsPaid = async () => {
        if (!invoice || !invoice.id) return
        const toUpdate: Invoice = {...invoice};

        toUpdate.status = 'paid'
        const result = await updateInvoice(toUpdate.id, toUpdate);
        window.location.reload()
    }

    const idPayed = () => {
        return invoice?.status == 'paid'
    }

    const getOptions = () => {
        return (
            <div className="flex gap-2">
                <NewInvoice invoice={invoice}></NewInvoice>
                <Delete id={invoice?.id ?? '0'}></Delete>
                <Button
                    disabled={idPayed()}
                    className={`bg-purple-dark text-white active:bg-purple-dark hover:bg-purple-light 
                    ${idPayed() && 'cursor-not-allowed'}`}
                    onClick={markAsPaid}>
                    <span>Mark as Paid</span>
                </Button>
            </div>
        );
    };

    const getFooter = () => {
        return (
            <footer className="flex md:hidden w-full bg-blue-darker justify-center mt-10 py-5">
                <div className="">{getOptions()}</div>
            </footer>
        );
    };

    return (
        <AppLayout outside={getFooter()}>
            <Link href="/" passHref={true}>
                <button className="flex text-white items-center text-xs mb-5 mt-4">
                    <div className="mr-5">
                        <img src="/icon-arrow-left.svg" alt="" />
                    </div>
                    <div className="">Go back</div>
                </button>
            </Link>
            <header
                className={`bg-blue-darker rounded-lg px-8 py-6
                flex items-center justify-between`}>
                <div
                    className="flex items-center w-full md:w-auto
                    justify-between md:justify-start md:gap-2">
                    <div className="text-white text-sm">Status</div>
                    
                    {invoice?.status == 'paid' && <InvoiceBadge status={BadgeStatus.PAID}/>}
                    {invoice?.status == 'pending' && <InvoiceBadge status={BadgeStatus.PENDING}/>}
                    {invoice?.status == 'draft' && <InvoiceBadge status={BadgeStatus.DRAFT}/>}
                </div>

                <div className="hidden md:block">{getOptions()}</div>
            </header>

            <section className="bg-blue-darker rounded-lg px-8 py-6 mt-12 text-white text-sm">
                <div className="flex flex-col md:flex-row gap-y-5 justify-between">
                    <div className="">
                        <div className="text-lg font-bold">
                            <span className="text-gray-light">#</span>
                            <span className="">{invoice?.id}</span>
                        </div>
                        <div className="text-white-dark">
                            {invoice?.description}
                        </div>
                    </div>
                    <div className="text-white-dark">
                        <div className="">{invoice?.senderAddress.street}</div>
                        <div className="">{invoice?.senderAddress.city}</div>
                        <div className="">
                            {invoice?.senderAddress.postCode}
                        </div>
                        <div className="">{invoice?.senderAddress.country}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-y-3 mt-5 md:mt-0">
                    <div className="">
                        <div className="text-white-dark">Invoice Date</div>
                        {invoice && (
                            <div className="font-bold text-base">
                                {dateFormat(invoice?.createdAt)}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <div className="text-white-dark">Bill To</div>
                        <div className="font-bold text-base">
                            {invoice?.clientName}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-white-dark">Sent to</div>
                        <div className="">{invoice?.clientEmail}</div>
                    </div>
                    <div className="">
                        <div className="text-white-dark">Payment Due</div>
                        {invoice && (
                            <div className="font-bold text-base">
                                {dateFormat(invoice?.paymentDue)}
                            </div>
                        )}
                    </div>
                    <div className="text-white-dark">
                        <div className="">{invoice?.clientAddress.street}</div>
                        <div className="">{invoice?.clientAddress.city}</div>
                        <div className="">
                            {invoice?.clientAddress.postCode}
                        </div>
                        <div className="">{invoice?.clientAddress.country}</div>
                    </div>
                </div>

                <div className="block md:hidden">
                    <div className="text-white-dark">Sent to</div>
                    <div className="">{invoice?.clientEmail}</div>
                </div>

                <div className="overflow-x-auto">
                    <div className="" style={{ minWidth: "600px" }}>
                        <div className="bg-blue-dark rounded-t-lg mt-10 p-7">
                            <div className="w-full">
                                <div className="flex w-full justify-between text-base">
                                    <div className="w-2/4">Item Name</div>
                                    <div className="w-1/6 text-center">
                                        QTY.
                                    </div>
                                    <div className="w-1/6 text-right">
                                        Price
                                    </div>
                                    <div className="w-1/6 text-right">
                                        Total
                                    </div>
                                </div>

                                {invoice &&
                                    invoice.items.map((item, index) => {
                                        return (
                                            <div
                                                className="flex w-full justify-between font-bold mt-7"
                                                key={index}>
                                                <div className="w-2/4">
                                                    {item.name}
                                                </div>
                                                <div className="w-1/6 text-center">
                                                    {item.quantity}
                                                </div>
                                                <div className="w-1/6 text-right">
                                                    {moneyStringFormat(item.price)}
                                                </div>
                                                <div className="w-1/6 text-right">
                                                    {moneyStringFormat(item.total)}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        <div className="bg-black-dark rounded-b-lg p-7">
                            <div className="flex w-full justify-between items-center">
                                <div className="">Amount Due</div>
                                <div className="font-bold text-2xl">
                                    {invoice && moneyStringFormat(invoice.total)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default PageGuard(Details, {});
