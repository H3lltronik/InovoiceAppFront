import dayjs from 'dayjs';

export const dateFormat = (date: string, format: string = "DD MMM YYYY") => {
    return dayjs(date).format(format);
}

export const moneyStringFormat = (price: number, fixed: number = 2) => {
    if (!price) price = 0
    price = Number(price);
    const priceText = price.toFixed(fixed);
    return `$${priceText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}