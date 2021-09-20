import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { NewInvoice } from "../../components/Dialog";
import { Delete } from "../../components/Dialog/Delete";
import { Button } from "../../components/Form/Button";
import {
  BadgeStatus,
  InvoiceBadge,
} from "../../components/Invoice/InvoiceBadge";
import { AppLayout } from "../../components/Layout/AppLayout";

const Details: NextPage = () => {
  const getOptions = () => {
    return (
      <div className="flex gap-2">
        <NewInvoice></NewInvoice>
        <Delete></Delete>
        <Button
          className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
          onClick={() => {}}>
          <span>Mark as Paid</span>
        </Button>
      </div>
    );
  };

  const getFooter = () => {
    return (
      <footer className="flex md:hidden w-full bg-blue-dark justify-center mt-10 py-5">
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
          <InvoiceBadge status={BadgeStatus.PENDING}></InvoiceBadge>
        </div>

        <div className="hidden md:block">{getOptions()}</div>
      </header>

      <section className="bg-blue-darker rounded-lg px-8 py-6 mt-12 text-white text-sm">
        <div className="flex flex-col md:flex-row gap-y-5 justify-between">
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

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-y-3 mt-5 md:mt-0">
          <div className="">
            <div className="text-white-dark">Invoice Date</div>
            <div className="font-bold text-base">21 Aug 2021</div>
          </div>
          <div className="">
            <div className="text-white-dark">Bill To</div>
            <div className="font-bold text-base">Alex Grim</div>
          </div>
          <div className="hidden md:block">
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

        <div className="block md:hidden">
          <div className="text-white-dark">Sent to</div>
          <div className="">alexgrim@mail.com</div>
        </div>

        <div className="overflow-x-auto">
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
        </div>
      </section>
    </AppLayout>
  );
};

export default Details;
