import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createInvoice, updateInvoice } from "../../api";
import { generateUID, getEmptyInvoice } from "../../lib/lib";
import { paymentTerms } from "../../store/paymentTerms";
import { Invoice, Item } from "../../store/types";
import { Button } from "../Form/Button";
import { Datepicker } from "../Form/Datepicker";
import { Input } from "../Form/Input";
import { InvoiceItem } from "../Form/InvoiceItem";
import { Select } from "../Form/Select";
import { Modal, ModalElement } from "./Modal";
import Router from "next/router";

type NewInvoiceProps = {
  invoice?: Invoice|null,
}
export const NewInvoice: FC<NewInvoiceProps> = (props) => {
  const modalRef = useRef<ModalElement>(null);
  const [invoice, setInvoice] = useState<Invoice|null>(null)
  const { handleSubmit, control, register } = useForm({mode: 'onChange'});
  let status: string = "draft";

  const onSubmit = async (data: any) => {
    data.status = status
    console.log("dataa", data, isEditing(), !isEditing() && !!data)
    if (isEditing() && invoice && invoice.id) {
      await updateInvoice(invoice.id, data);
    } else if (!isEditing() && !!data) {
      await createInvoice(data);
    }
    Router.reload()
  };

  const reloadInvoice = () => {
    setInvoice({...getEmptyInvoice()})
    
    if (props.invoice)
      setInvoice({...props.invoice})
  }

  useEffect(() => {
    reloadInvoice()
  }, [props])

  const doSubmit = (stat: any) => {
    status = stat;
    handleSubmit(onSubmit)()
  }

  const getActivator = () => {
    return (
      <Button
        className="bg-blue-dark text-white hover:bg-purple-light active:bg-purple-dark"
        onClick={() => {}}>
        <span>Edit</span>
      </Button>
    );
  };

  const addItem = () => {
    if (!invoice) return
    const newInvoice = {...invoice}
    newInvoice.items = [...invoice.items, {name: '', price: 0, quantity: 0, total: 0 }]
    setInvoice(newInvoice);
  }

  const removeItem = (index: number) => {
    if (!invoice) return
    const newInvoice = {...invoice}
    newInvoice.items = [...invoice.items];
    newInvoice.items.splice(index, 1)
    setInvoice(newInvoice);
  }

  const closeModal = () => {
    modalRef.current?.closeModal();
  }

  const isEditing = () : boolean => {
    return !!invoice?.id
  }

  return (
    <Modal activator={props.children? props.children : getActivator()} onModalToggle={reloadInvoice} ref={modalRef}>
      <section
        className={`absolute min-h-screen bg-white dark:bg-black-light left-0 transform z-10
            w-full sm:w-3/4 lg:w-1/2 lg:max-w-screen-md text-white
            text-left 
            pl-10 lg:pl-40 pt-32 lg:pt-10 pr-10 pb-10 lg:pb-10
        `}>
        <button className="flex lg:hidden items-center text-xs text-black dark:text-white-dark mb-5 mt-4"
        onClick={closeModal}>
          <div className="mr-5">
            <img src="/icon-arrow-left.svg" alt="" />
          </div>
          <div className="">Go back</div>
        </button>
        {
          isEditing()?
          <h2 className="text-black dark:text-white font-bold text-2xl">
            <span className="">Edit </span>
            <span className="text-2xl font-bold">
                <span className="text-gray-light">#</span>
                <span className="">{invoice?.id}</span>
            </span>
          </h2>
          :<h2 className="dark:text-white font-bold text-2xl">New Invoice</h2>
        }

        <div className="mt-10">
          {invoice?.id && <input hidden />}

          <div className="text-sm text-purple-light font-bold">Bill from</div>

          <Input control={control} name="senderAddress.id" value={invoice?.senderAddress.id} hidden/>
          <Input control={control} name="clientAddress.id" value={invoice?.clientAddress.id} hidden/>
          <Input control={control} name="id" value={invoice?.id} hidden/>

          <div className={`mt-5`}>
            <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Street Address</div>
            <Input rules={{ required: true }} control={control} name="senderAddress.street" value={invoice?.senderAddress.street}/>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>City</div>
              <Input rules={{ required: true }} control={control} name="senderAddress.city" value={invoice?.senderAddress.city}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Post Code</div>
              <Input rules={{ required: true }} control={control} name="senderAddress.postCode" value={invoice?.senderAddress.postCode}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Country</div>
              <Input rules={{ required: true }} control={control} name="senderAddress.country" value={invoice?.senderAddress.country}/>
            </div>
          </div>

          <div className="text-sm text-purple-light font-bold mt-10">
            Bill to
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Client’s Name</div>
            <Input rules={{ required: true }} control={control} name="clientName" value={invoice?.clientName}/>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Client’s Email</div>
            <Input rules={{ required: true }} control={control} name="clientEmail" value={invoice?.clientEmail}/>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Street Address</div>
            <Input rules={{ required: true }} control={control} name="clientAddress.street" value={invoice?.clientAddress.street}/>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>City</div>
              <Input rules={{ required: true }} control={control} name="clientAddress.city" value={invoice?.clientAddress.city}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Post Code</div>
              <Input rules={{ required: true }} control={control} name="clientAddress.postCode" value={invoice?.clientAddress.postCode}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Country</div>
              <Input rules={{ required: true }} control={control} name="clientAddress.country" value={invoice?.clientAddress.country}/>
            </div>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5 w-1/2`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Issue Date</div>
              <Datepicker rules={{ required: true }} name="paymentDue" control={control} value={invoice?.createdAt} disabled={isEditing()}/>
            </div>
            <div className={`mt-5 w-1/2 z-10`}>
              <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Payment Terms</div>
              <Select rules={{ required: true }} name="paymentTerms" control={control}
                value={invoice?.paymentTerms}
                label="test"
                items={paymentTerms}></Select>
            </div>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-gray-dark dark:text-white-dark mb-2`}>Project Description</div>
            <Input rules={{ required: true }} control={control} name="description" value={invoice?.description}/>
          </div>

          <div className="mt-10">
            <div className="">
              <h2 className="text-left text-xl font-bold text-gray-dark">Item List</h2>
            </div>

            <div className="text-gray-dark dark:text-white-dark w-full justify-between text-xs text-left mt-5 hidden md:flex">
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

            {invoice?.items.map((item, i) => {
              return <InvoiceItem control={control} onRemoveItem={removeItem} item={item} index={i} key={item.id + i}/>
            })}

            <div className="mt-5">
              <Button className="bg-white-dark dark:bg-blue-dark justify-center hover:bg-purple-light active:bg-purple-dark w-full
                text-gray-dark dark:text-white hover:text-white"
              onClick={addItem}>
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
                onClick={() => { doSubmit('draft')}}>
                  <span className="">Save as Draft</span>
                </Button>
                <Button className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                onClick={() => { doSubmit('pending')}}>
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
