import Link from "next/link";
import React from "react";
import { InvoiceBadge, BadgeStatus } from "../Invoice/InvoiceBadge";

const InvoiceItemList = () => {
  return (
    <Link href="/invoice/1" passHref={true}>
      <button
        className="bg-blue-dark hover:blue-darker hover:bg-opacity-25
        w-full md:h-16 rounded-lg text-sm p-5 md:p-0">
        <div className="w-full h-full items-center text-white grid grid-cols-2 md:grid-cols-5 md:grid-flow-col gap-y-7">
          <div className="text-left md:text-center">
            <span className="text-gray-dark">#</span>
            <span>RT3080</span>
          </div>

          <div className="text-xs hidden md:block">
            <span>Due 19 Aug 2021</span>
          </div>
          
          <div className="text-xs text-right md:text-center">
            <span>Jensen Huang</span>
          </div>
          <div className="text-left">
            <div className="md:hidden text-xs">
              <span>Due 19 Aug 2021</span>
            </div>
            <div className="text-lg font-bold">
              <span>£ 1,800.90</span>
            </div>
          </div>
          <div className="flex items-center justify-end md:justify-center">
            <InvoiceBadge status={BadgeStatus.DRAFT}></InvoiceBadge>
            <div className="ml-3 hidden md:block">
              <img src="./icon-arrow-right.svg" alt="arrow right" />
            </div>
          </div>
        </div>
        
      </button>
    </Link>
  );
};

export default InvoiceItemList;
