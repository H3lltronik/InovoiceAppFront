import axios from "axios";
import dayjs from "dayjs";
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

export const toggleTheme = () => {
    const htmlClasses = document.querySelector("html")?.classList;
    if (!htmlClasses) return

    if (htmlClasses.contains("light")) {
        htmlClasses.remove("light");
        htmlClasses.add("dark");
    } else if (htmlClasses.contains("dark")) {
        htmlClasses.remove("dark");
        htmlClasses.add("light");
    }
}

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
        items: [
            {
                name: "Example item",
                price: 10,
                quantity: 2,
                total: 0,
            }
        ],
        total: 0,
    };
};

export const fetchImageToBlobText = async (url: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const result = await axios
            .get(url, { responseType: "blob" })
            .then(function (response) {
                let reader = new window.FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {
                    let imageDataUrl = reader.result;
                    if (typeof imageDataUrl == 'string')
                        resolve(imageDataUrl);
                    
                    reject();
                };
            });
    });
};
