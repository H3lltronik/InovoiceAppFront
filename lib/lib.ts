import dayjs from "dayjs";
import { useStore } from "../store";
import { Invoice } from "../store/types";

export const dateFormat = (date: string, format: string = "DD MMM YYYY") => {
    return dayjs(date).format(format);
};

export const moneyStringFormat = (price: number, fixed: number = 2) => {
    if (!price) price = 0;
    price = Number(price);
    const priceText = price.toFixed(fixed);
    return `$${priceText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const generateUID = (): string => {
    let firstPart: number | string = (Math.random() * 46656) | 0;
    let secondPart: number | string = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
};

export const getEmptyInvoice = (): Invoice => {
    return {
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: 0,
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        items: [],
        total: 0,
    };
};
