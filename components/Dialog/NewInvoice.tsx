import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { updateInvoice } from "../../api";
import { generateUID, getEmptyInvoice } from "../../lib/lib";
import { paymentTerms } from "../../store/paymentTerms";
import { Invoice, Item } from "../../store/types";
import { Button } from "../Form/Button";
import { Datepicker } from "../Form/Datepicker";
import { Input } from "../Form/Input";
import { InvoiceItem } from "../Form/InvoiceItem";
import { Select } from "../Form/Select";
import { Backdrop } from "./Backdrop";
import { Modal, ModalElement } from "./Modal";

type NewInvoiceProps = {
  invoice?: Invoice|null,
}
export const NewInvoice: FC<NewInvoiceProps> = (props) => {
  const modalRef = useRef<ModalElement>(null);
  const [invoice, setInvoice] = useState<Invoice|null>(null)
  const [status, setStatus] = useState<'draft'|'pending'>('draft');
  const { register, handleSubmit, formState: { errors }, } = useForm({mode: 'onChange'});
  const onSubmit = async (data: any) => {
    const total = calcTotal();
    // updateInvoice
    console.log("gonna do submit", invoice, total, data)
    window.location.reload()
  };

  const reloadInvoice = () => {
    setInvoice({...getEmptyInvoice()})
    
    if (props.invoice)
      setInvoice({...props.invoice})
  }

  useEffect(() => {
    reloadInvoice()
  }, [props])

  const doSubmit = () => {
      handleSubmit(onSubmit)();
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
    newInvoice.items = [...invoice.items, {name: '', price: 0, quantity: 0, total: 0, id: generateUID()}]
    setInvoice(newInvoice);
  }

  const removeItem = (index: number) => {
    if (!invoice) return
    const newInvoice = {...invoice}
    newInvoice.items = [...invoice.items];
    newInvoice.items.splice(index, 1)
    setInvoice(newInvoice);
  }

  const calcTotal = () => {
    const result = invoice?.items.reduce((prev: Item, curr: Item): any => {
      return prev.total + curr.total
    });

    return result;
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
        className={`absolute min-h-screen bg-black-light left-0 transform z-10
            w-full sm:w-3/4 lg:w-1/2 lg:max-w-screen-md text-white
            text-left 
            pl-10 lg:pl-40 pt-32 lg:pt-10 pr-10 pb-10 lg:pb-10
        `}>
        <button className="flex lg:hidden text-white items-center text-xs text-white-dark mb-5 mt-4"
        onClick={closeModal}>
          <div className="mr-5">
            <img src="/icon-arrow-left.svg" alt="" />
          </div>
          <div className="">Go back</div>
        </button>
        {
          isEditing()?
          <h2 className="text-white font-bold text-2xl">
            <span className="">Edit </span>
            <span className="text-2xl font-bold">
                <span className="text-gray-light">#</span>
                <span className="">{invoice?.id}</span>
            </span>
          </h2>
          :<h2 className="text-white font-bold text-2xl">New Invoice</h2>
        }

        <div className="mt-10">
          {invoice?.id && <input hidden {...register("id")} />}

          <div className="text-sm text-purple-light font-bold">Bill from</div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Street Address</div>
            <Input validation={ {...register("senderAddress.street", { required: true })}} value={invoice?.senderAddress.street}
            showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input validation={ {...register("senderAddress.city", { required: true })}} value={invoice?.senderAddress.city}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input validation={ {...register("senderAddress.postCode", { required: true })}} value={invoice?.senderAddress.postCode}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input validation={ {...register("senderAddress.country", { required: true })}} value={invoice?.senderAddress.country}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
          </div>

          <div className="text-sm text-purple-light font-bold mt-10">
            Bill to
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Name</div>
            <Input validation={ {...register("clientName", { required: true })}} value={invoice?.clientName}
            showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Client’s Email</div>
            <Input validation={ {...register("clientEmail", { required: true })}} value={invoice?.clientEmail}
            showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Street Address</div>
            <Input validation={ {...register("clientAddress.street", { required: true })}} value={invoice?.clientAddress.street}
            showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
          </div>
          <div className="flex gap-5">
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>City</div>
              <Input validation={ {...register("clientAddress.city", { required: true })}} value={invoice?.clientAddress.city}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Post Code</div>
              <Input validation={ {...register("clientAddress.postCode", { required: true })}} value={invoice?.clientAddress.postCode}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
            <div className={`mt-5`}>
              <div className={`text-xs text-white-dark mb-2`}>Country</div>
              <Input validation={ {...register("clientAddress.country", { required: true })}} value={invoice?.clientAddress.country}
              showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
            </div>
          </div>

          <div className="flex gap-5">
            <div className={`mt-5 w-1/2`}>
              <div className={`text-xs text-white-dark mb-2`}>Issue Date</div>
              <Datepicker value={invoice?.createdAt} disabled={isEditing()}/>
            </div>
            <div className={`mt-5 w-1/2 z-10`}>
              <div className={`text-xs text-white-dark mb-2`}>Payment Terms</div>
              <Select
                value={invoice?.paymentTerms}
                label="test"
                items={paymentTerms}></Select>
            </div>
          </div>

          <div className={`mt-5`}>
            <div className={`text-xs text-white-dark mb-2`}>Project Description</div>
            <Input validation={ {...register("description", { required: true })}} value={invoice?.description}
            showError={errors.senderAddress?.street} errorMessage={"Required field"}/>
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

            {invoice?.items.map((item, i) => {
              return <InvoiceItem register={register} onRemoveItem={removeItem} item={item} index={i} key={item.id}/>
            })}

            <div className="mt-5">
              <Button className="bg-blue-dark justify-center text-white hover:bg-purple-light active:bg-purple-dark w-full"
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
                onClick={() => { setStatus('draft'); doSubmit()}}>
                  <span className="">Save as Draft</span>
                </Button>
                <Button className="bg-purple-dark text-white hover:bg-purple-light active:bg-purple-dark"
                onClick={() => { setStatus('pending'); doSubmit()}}>
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
