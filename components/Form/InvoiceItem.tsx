import React, { FC, useCallback, useEffect, useState } from "react";
import { generateUID } from "../../lib/lib";
import { Item } from "../../store/types";
import { Input } from "./Input";

type InvoiceItemProps = {
    control?: any;
    index: number;
    item?: Item;
    onRemoveItem: (index: number) => any;
};
export const InvoiceItem: FC<InvoiceItemProps> = (props) => {
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        if (props.item) setItem(props.item);
    }, [props.item]);

    const removeItem = (index: number) => {
        props.onRemoveItem(index);
    };

    const calcTotal = useCallback(() => {
        if (!item) return 0
        if (item.price && item.quantity) return item.price * item.quantity;

        return 0;
    }, [item?.price, item?.quantity]);

    const changePrice = (price: string) => {
        const priceNumber = Number(price);
        if (item) setItem({ ...item, price: priceNumber });
    };

    const changeQuantity = (quantity: string) => {
        const priceNumber = Number(quantity);
        if (item) setItem({ ...item, quantity: priceNumber });
    };

    return (
        <>
            {item && (
                <div
                    className="flex flex-wrap md:flex-nowrap w-full justify-between items-stretch md:items-center text-xs text-left gap-y-3 
                    md:gap-3 mt-5" key={generateUID()}>
                    <div className="w-full md:w-2/4">
                        <Input control={props.control} name={`items.${props.index}.id`} value={item.id} hidden/>

                        <div className="mb-2 text-gray-dark dark:text-white-dark block md:hidden">
                            Item Name
                        </div>
                        <div className="flex items-center">
                            <Input
                                name={`items.${props.index}.name`}
                                rules={{ required: true }}
                                control={props.control}
                                boxClassName="flex-grow"
                                value={item.name}></Input>
                            <div className="pl-2 block xs:hidden">
                                <button
                                    className=""
                                    onClick={() => removeItem(props.index)}>
                                    <img
                                        className=""
                                        src="/icon-delete.svg"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 md:w-1/6 px-1 md:px-0">
                        <div className="mb-2 text-gray-dark dark:text-white-dark block md:hidden">
                            QTY.
                        </div>
                        <Input
                            name={`items.${props.index}.quantity`}
                            rules={{ required: true }}
                            control={props.control}
                            onChange={changeQuantity}
                            value={item.quantity}></Input>
                    </div>
                    <div className="w-1/3 md:w-1/6 px-1 md:px-0">
                        <div className="mb-2 text-gray-dark dark:text-white-dark block md:hidden">
                            Price
                        </div>
                        <Input
                            name={`items.${props.index}.price`}
                            rules={{ required: true }}
                            control={props.control}
                            value={item.price}
                            onChange={changePrice}></Input>
                    </div>
                    <div className="w-1/3 md:w-1/6 flex flex-col px-1 md:px-0">
                        <div className="mb-2 text-gray-dark dark:text-white-dark block md:hidden">
                            Total
                        </div>
                        <div className="flex items-center gap-5 flex-grow text-gray-dark dark:text-white-dark">
                            <div className="">{calcTotal().toFixed(2)}</div>
                            <div className="hidden xs:block">
                                <button
                                    className=""
                                    onClick={() => removeItem(props.index)}>
                                    <img
                                        className=""
                                        src="/icon-delete.svg"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
