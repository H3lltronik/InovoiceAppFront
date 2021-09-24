import Link from "next/link";
import React, { FC } from "react";
import { dateFormat, moneyStringFormat } from "../../lib/lib";
import { Invoice } from "../../store/types";
import { InvoiceBadge, BadgeStatus } from "../Invoice/InvoiceBadge";

type InvoiceItemListProps = {
    data: Invoice;
};
const InvoiceItemList: FC<InvoiceItemListProps> = (props) => {
    return (
        <Link href={`/invoice/${props.data.id}`} passHref={true}>
            <button
                className="bg-white dark:bg-blue-dark hover:blue-darker hover:bg-opacity-25 theme-transition
                    w-full md:h-16 rounded-lg text-sm p-5 md:p-0">
                <div className="w-full h-full items-center dark:text-white grid grid-cols-2 md:grid-cols-5 md:grid-flow-col gap-y-7">
                    <div className="text-left md:text-center">
                        <span className="text-gray-dark">#</span>
                        <span>{props.data.id}</span>
                    </div>

                    <div className="text-xs hidden md:block text-gray-light dark:text-white">
                        <span className="">
                            <span>Due </span>
                            <span>{dateFormat(props.data.paymentDue)}</span>
                        </span>
                    </div>

                    <div className="text-xs text-right md:text-center text-gray-light dark:text-white">
                        <span>Jensen Huang</span>
                    </div>
                    <div className="text-left">
                        <div className="md:hidden text-xs">
                            <span className="">
                                <span>Due </span>
                                <span>{dateFormat(props.data.paymentDue)}</span>
                            </span>
                        </div>
                        <div className="text-lg font-bold text-left md:text-center">
                            <span>{moneyStringFormat(props.data.total)}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end md:justify-center">
                        {props.data.status == 'paid' && <InvoiceBadge status={BadgeStatus.PAID}/>}
                        {props.data.status == 'pending' && <InvoiceBadge status={BadgeStatus.PENDING}/>}
                        {props.data.status == 'draft' && <InvoiceBadge status={BadgeStatus.DRAFT}/>}
                        <div className="ml-3 hidden md:block">
                            <img
                                src="./icon-arrow-right.svg"
                                alt="arrow right"
                            />
                        </div>
                    </div>
                </div>
            </button>
        </Link>
    );
};

export default InvoiceItemList;
