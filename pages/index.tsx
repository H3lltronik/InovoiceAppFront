import type { NextPage } from "next";
import AppBar from "../components/AppBar/AppBar";
import { NewInvoice } from "../components/Dialog";
import { Button } from "../components/Form/Button";
import { Popover } from "../components/Form/Popover";
import InvoiceItemList from "../components/Invoice/InvoiceItemList";

const Home: NextPage = () => {
  return (
    <div className="relative">
      <AppBar></AppBar>
      <NewInvoice></NewInvoice>
      <main className="container mx-auto pt-12">
        <div className="flex">
          <div className="">
            <h1 className="text-3xl font-bold text-white">Invoices</h1>
            <p className="font-normal text-xs text-white-dark mt-1">
              There are 7 total invoices
            </p>
          </div>

          <div className="flex-grow"></div>

          <div className="flex items-center">
            <Popover></Popover>
            <Button text="New Invoice" appendIcon="plus" onClick={() => {}}></Button>
          </div>
        </div>

        <section className="flex flex-col gap-5 mt-14">
          {[1, 1, 1, 1, 1, 1, 1].map((_, i) => {
            return <InvoiceItemList key={i} />;
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
