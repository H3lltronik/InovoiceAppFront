import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState, forwardRef, useImperativeHandle } from "react";

type ModalProps = {
  activator: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  containerClass?: string;
  onModalToggle?: (status: boolean) => any;
};
const ModalComponent = (props: any, ref: any) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    if (props.onModalToggle) props.onModalToggle(false)
    setIsOpen(false);
  }

  function openModal() {
    if (props.onModalToggle) props.onModalToggle(true)
    setIsOpen(true);
  }

  useImperativeHandle(ref, () => ({
    closeModal,
    openModal,
  }));

  return (
    <>
      <div onClick={openModal}>{props.activator}</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className={`${props.containerClass}`}>
                {props.title ? (
                  <Dialog.Title>{props.title}</Dialog.Title>
                ) : null}

                {props.children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export type ModalElement = {
  closeModal: () => any,
  openModal: () => any,
}
export const Modal = forwardRef<ModalElement, ModalProps>(ModalComponent);
