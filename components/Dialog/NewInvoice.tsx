import React, { FC, useRef, useState } from "react";
import { Invoice } from "../../store/types";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { Backdrop } from "./Backdrop";
import { Modal, ModalElement } from "./Modal";

type NewInvoiceProps = {
  invoice?: Invoice|null,
}
export const NewInvoice: FC<NewInvoiceProps> = (props) => {
  const modalRef = useRef<ModalElement>(null);

  const getActivator = () => {
    return (
      <Button
        className="bg-blue-dark text-white hover:bg-purple-light active:bg-purple-dark"
        onClick={() => {}}>
        <span>Edit</span>
      </Button>
    );
  };

  const closeModal = () => {
    modalRef.current?.closeModal();
  }

  return (
    <Modal activator={props.children? props.children : getActivator()} ref={modalRef}>
      <section
        className={`absolute min-h-screen bg-black-light left-0 transform z-10
            w-full sm:w-3/4 lg:w-1/2 lg:max-w-screen-md text-white
            text-left lg:text-center
            pl-10 lg:pl-40 pt-32 lg:pt-10 pr-10 pb-10 lg:pb-10
        `}>
        <button className="flex lg:hidden text-white items-center text-xs text-white-dark mb-5 mt-4"
        onClick={closeModal}>
          <div className="mr-5">
            <img src="/icon-arrow-left.svg" alt="" />
          </div>
          <div className="">Go back</div>
        </button>
        <h2 className="text-white font-bold text-2xl">New Invoice</h2>

        <div className="mt-10">
          <div className="text-sm text-purple-light font-bold">Bill from</div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Street Address</div>
            <Input value={props.invoice?.senderAddress.street}></Input>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input value={props.invoice?.senderAddress.city}></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input value={props.invoice?.senderAddress.postCode}></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input value={props.invoice?.senderAddress.country}></Input>
            </div>
          </div>

          <div className="text-sm text-purple-light font-bold mt-10">
            Bill to
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Name</div>
            <Input value={props.invoice?.clientName}></Input>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Email</div>
            <Input value={props.invoice?.clientEmail}></Input>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input value={props.invoice?.senderAddress.city}></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input value={props.invoice?.senderAddress.postCode}></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input value={props.invoice?.senderAddress.country}></Input>
            </div>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5 w-1/2`}>
              <div className={`text-xs text-white-dark mb-2`}>Issue Date</div>
              <Input></Input>
            </div>
            <div className={`mt-5 w-1/2`}>
              <div className={`text-xs text-white-dark mb-2`}>Payment Terms</div>
              <Select
                label="test"
                items={[
                  { text: "test", value: "val" },
                  { text: "test2", value: "val3" },
                ]}></Select>
            </div>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Project Description</div>
            <Input value={props.invoice?.description}></Input>
          </div>

          <div className="mt-10">
            <div className="">
              <h2 className="text-left text-xl font-bold text-gray-dark">Item List</h2>
            </div>

            <div className="w-full justify-between text-xs text-left mt-5 hidden md:flex">
                <div className="w-2/4">Item Name</div>
                <div className="w-1/6">
                    QTY.
                </div>
                <div className="w-1/6">
                    Price
                </div>
                <div className="w-1/6">
                    Total
                </div>
            </div>

            {props.invoice?.items.map((item, i) => {
              return <div className="flex flex-wrap md:flex-nowrap w-full justify-between items-stretch md:items-center text-xs text-left gap-y-3 
              md:gap-3 mt-5" key={i}>
                      <div className="w-full md:w-2/4">
                        <div className="mb-2 text-white-dark block md:hidden">Item Name</div>
                        <div className="flex items-center">
                          <Input boxClassName="flex-grow" value={item.name}></Input>
                          <div className="pl-2 block xs:hidden">
                            <button className="">
                              <img className="" src="/icon-delete.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3 md:w-1/6 px-1 md:px-0">
                          <div className="mb-2 text-white-dark block md:hidden">QTY.</div>
                          <Input value={item.quantity}></Input>
                      </div>
                      <div className="w-1/3 md:w-1/6 px-1 md:px-0">
                          <div className="mb-2 text-white-dark block md:hidden">Price</div>
                          <Input value={item.price}></Input>
                      </div>
                      <div className="w-1/3 md:w-1/6 flex flex-col px-1 md:px-0">
                          <div className="mb-2 text-white-dark block md:hidden">Total</div>
                          <div className="flex items-center gap-5 flex-grow">
                            <div className="">{item.total.toFixed(2)}</div>
                            <div className="hidden xs:block">
                              <button className="">
                                <img className="" src="/icon-delete.svg" alt="" />
                              </button>
                            </div>
                          </div>
                      </div>
                    </div>
            })}

            <div className="mt-5">
              <Button className="bg-blue-dark justify-center text-white hover:bg-purple-light active:bg-purple-dark w-full"
              onClick={() => {}}>
                <span className="">+ Add New Item</span>
              </Button>
            </div>

            <footer className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-10">
              <Button className="bg-gray-light text-white hover:bg-purple-light active:bg-purple-dark"
              onClick={closeModal}>
                <span className="">Discard</span>
              </Button>

              <div className="flex items-center gap-3">
                <Button className="bg-black-dark text-white hover:bg-purple-light active:bg-purple-dark"
                onClick={() => {}}>
                  <span className="">Save as Draft</span>
                </Button>
                <Button className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                onClick={() => {}}>
                  <span className="">Save & Send</span>
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </Modal>
  );
};
