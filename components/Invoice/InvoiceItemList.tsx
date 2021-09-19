import React from 'react'
import { InvoiceBadge, BadgeStatus } from "../Invoice/InvoiceBadge"

const InvoiceItemList = () => {
    return (
        <button className="bg-blue-dark hover:blue-darker hover:bg-opacity-25
        w-full h-16 rounded-lg text-sm">
            <div className="w-full h-full items-center text-white
                grid grid-flow-col">
                <div className="">
                    <span className="text-gray-dark">#</span>
                    <span>RT3080</span>
                </div>
                <div className="text-xs">
                    <span>Due 19 Aug 2021</span>
                </div>
                <div className="text-xs">
                    <span>Jensen Huang</span>
                </div>
                <div className="text-lg font-bold">
                    <span>£ 1,800.90</span>
                </div>
                <div className="flex items-center">
                    <InvoiceBadge status={BadgeStatus.DRAFT}></InvoiceBadge>
                    <div className="ml-3">
                        <img src="./icon-arrow-right.svg" alt="arrow right" />
                    </div>
                </div>
            </div>
        </button>
    )
}

export default InvoiceItemList
