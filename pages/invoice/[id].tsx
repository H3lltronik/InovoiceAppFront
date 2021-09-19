import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { NewInvoice } from "../../components/Dialog";
import { Button } from "../../components/Form/Button";
import {
  BadgeStatus,
  InvoiceBadge,
} from "../../components/Invoice/InvoiceBadge";
import { AppLayout } from "../../components/Layout/AppLayout";

const Details: NextPage = () => {
  return (
    <AppLayout>
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
        flex items-center`}>
        <div className="flex items-center gap-2">
          <div className="text-white text-sm">Status</div>
          <InvoiceBadge status={BadgeStatus.PENDING}></InvoiceBadge>
        </div>

        <div className="flex-grow"></div>
        <div className="flex gap-2">
          <NewInvoice></NewInvoice>
          <Button
            className="bg-red-500 text-white hover:bg-purple-light active:bg-purple-dark"
            onClick={() => {}}>
            <span>Delete</span>
          </Button>
          <Button
            className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
            onClick={() => {}}>
            <span>Mark as Paid</span>
          </Button>
        </div>
      </header>

      <section className="bg-blue-darker rounded-lg px-8 py-6 mt-12 text-white text-sm">
        <div className="flex justify-between">
          <div className="">
            <div className="text-lg font-bold">
              <span className="text-gray-light">#</span>
              <span className="">XM9141</span>
            </div>
            <div className="text-white-dark">Graphic Design</div>
          </div>
          <div className="text-white-dark">
            <div className="">19 Union Terrace</div>
            <div className="">London </div>
            <div className="">E1 3EZ</div>
            <div className="">United Kingdom</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-y-3">
          <div className="">
            <div className="text-white-dark">Invoice Date</div>
            <div className="font-bold text-base">21 Aug 2021</div>
          </div>
          <div className="">
            <div className="text-white-dark">Bill To</div>
            <div className="font-bold text-base">Alex Grim</div>
          </div>
          <div className="">
            <div className="text-white-dark">Sent to</div>
            <div className="">alexgrim@mail.com</div>
          </div>
          <div className="">
            <div className="text-white-dark">Payment Due</div>
            <div className="font-bold text-base">20 Sep 2021</div>
          </div>
          <div className="text-white-dark">
            <div className="">84 Church Way</div>
            <div className="">Bradford</div>
            <div className="">BD1 9PB</div>
            <div className="">United Kingdom</div>
          </div>
        </div>

        <div className="" style={{ minWidth: "600px" }}>
          <div className="bg-blue-dark rounded-t-lg mt-10 p-7">
            <div className="w-full">
              <div className="flex w-full justify-between text-base">
                <div className="w-2/4">Item Name</div>
                <div className="w-1/6 text-center">QTY.</div>
                <div className="w-1/6 text-right">Price</div>
                <div className="w-1/6 text-right">Total</div>
              </div>
              <div className="flex w-full justify-between font-bold mt-7">
                <div className="w-2/4">Banner Design</div>
                <div className="w-1/6 text-center">1</div>
                <div className="w-1/6 text-right">£ 156.00</div>
                <div className="w-1/6 text-right">£ 156.00</div>
              </div>
            </div>
          </div>

          <div className="bg-black-dark rounded-b-lg p-7">
            <div className="flex w-full justify-between items-center">
              <div className="">Amount Due</div>
              <div className="font-bold text-2xl">£ 556.00</div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Details;
