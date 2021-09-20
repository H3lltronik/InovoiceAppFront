import React, { useRef, useState } from "react";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { Backdrop } from "./Backdrop";
import { Modal, ModalElement } from "./Modal";

export const NewInvoice = () => {
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
    <Modal activator={getActivator()} ref={modalRef}>
      <section
        className={`absolute min-h-screen bg-black-light left-0 transform z-10
            w-full sm:w-3/4 lg:w-1/2 lg:max-w-screen-md text-white
            text-left lg:text-center
            pl-10 lg:pl-40 pt-32 lg:pt-10 pr-10 pb-10 lg:pb-0
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
            <Input></Input>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input></Input>
            </div>
          </div>

          <div className="text-sm text-purple-light font-bold mt-10">
            Bill to
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Name</div>
            <Input></Input>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Email</div>
            <Input></Input>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input></Input>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input></Input>
            </div>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5 w-1/2`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
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
        </div>
      </section>
    </Modal>
  );
};
