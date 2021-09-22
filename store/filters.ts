import { Invoice } from "./types";

export type Filter = {
    name: string,
    value: string
}
export const filters = [
    {
        name: 'Draft',
        value: 'draft',
    },
    {
        name: 'Pending',
        value: 'pending',
    },
    {
        name: 'Paid',
        value: 'paid',
    },
]