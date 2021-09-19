import type { NextPage } from "next";
import AppBar from "../components/AppBar/AppBar";
import { NewInvoice } from "../components/Dialog";
import { Button } from "../components/Form/Button";
import InvoiceItemList from "../components/Invoice/InvoiceItemList";
import { AppLayout } from "../components/Layout/AppLayout";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div className="flex">
        <div className="">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="font-normal text-xs text-white-dark mt-1">
            There are 7 total invoices
          </p>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center">
          {/* <MyModal></MyModal> */}
          <Button className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
          appendIcon="plus" onClick={() => {}}>
            <span>New Invoice</span>
          </Button>
        </div>
      </div>

      <section className="flex flex-col gap-5 mt-14">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => {
          return <InvoiceItemList key={i} />;
        })}
      </section>
    </AppLayout>
  );
};

export default Home;
