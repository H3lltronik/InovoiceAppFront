import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { useStore } from "../../store";
import { filters } from "../../store/filters";
import { Checkbox } from "./Checkbox";

type RadioDropDownProps = {
    className?: string;
}
export const RadioDropDown : FC<RadioDropDownProps> = (props) => {
    const selectedFilters = useStore(state => state.selectedFilters);
    const toggleFilter = useStore(state => state.toggleFilter)

    return (
        <div className={`mr-5 ${props.className}`}>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                                ${open ? "" : "text-opacity-90"}
                                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none 
                                focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                            <span className="text-sm">
                                <span className="">Filter </span>
                                <span className="hidden md:inline">by status</span>
                            </span>
                            <div className="ml-7">
                                <img src="/icon-arrow-down.svg" alt="" />
                            </div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute z-10 w-full min-w-[150px]">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative flex flex-col gap-3 bg-blue-dark p-6">
                                        {filters.map((item) => (
                                            <div key={item.name}>
                                                <Checkbox label={item.name} value={selectedFilters[item.value]} onChange={() => toggleFilter(item.value)}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};
