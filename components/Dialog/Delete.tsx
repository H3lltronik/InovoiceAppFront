import React, { FC, useRef, useState } from "react";
import { deleteInvoice } from "../../api";
import { Button } from "../Form/Button";
import Router from "next/router";
import { Modal, ModalElement } from "./Modal";

type DeleteInvoiceProps = {
  id: string
}
export const Delete : FC<DeleteInvoiceProps> = (props) => {
  const modalRef = useRef<ModalElement>(null);

  const closeModal = () => {
    modalRef.current?.closeModal();
  }

  const doDelete = async () => {
    const result = await deleteInvoice(props.id);
    if (result.error) {
      console.error("error while deleting")
    }
    closeModal();
    Router.push("/");
  }

  const getActivator = () => {
    return (
      <Button
        className="bg-red-500 text-white hover:bg-purple-light active:bg-purple-dark"
        onClick={() => {}}>
        <span>Delete</span>
      </Button>
    );
  };

  return (
    <Modal activator={getActivator()} ref={modalRef}>
      <section
        className={`text-white text-left absolute bg-blue-darker p-8 rounded-lg w-msg-modal max-w-full
      left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4`}>
        <h2 className="font-bold text-2xl">Confirm Deletion</h2>

        <p className={`text-xs text-white-dark mt-4`}>
          Are you sure you want to delete invoice #XM9141? This action cannot be
          undone.
        </p>

        <div className="flex justify-end items-center gap-3 mt-8">
          <Button
            className="bg-blue-dark text-white hover:bg-purple-light active:bg-purple-dark"
            onClick={closeModal}>
            <span>Cancel</span>
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-purple-light active:bg-purple-dark"
            onClick={doDelete}>
            <span>Delete</span>
          </Button>
        </div>
      </section>
    </Modal>
  );
};
