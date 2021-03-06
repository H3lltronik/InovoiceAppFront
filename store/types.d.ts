export interface SenderAddress {
    id?: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export type User = {
    id: number|string
    profilePicture: string
    refreshToken: string
    username: string
}

export type CreateUser = {
    username: string
    password: string
    confirmPassword: string
}

export interface ClientAddress {
    id?: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface Item {
    id?: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Invoice {
    id?: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: string;
    senderAddress: SenderAddress;
    clientAddress: ClientAddress;
    items: Item[];
    total: number;
}
