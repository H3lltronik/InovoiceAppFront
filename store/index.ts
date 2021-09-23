import createStore from "zustand";
import { Invoice, User } from "./types";

type StoreState = {
    invoices: Invoice[];
    filteredInvoices: Invoice[];
    invoiceDetails: Invoice | null;
    invoiceForm: Invoice | null;
    selectedFilters: any;
    user: User | null;
    appLoading: boolean;
};
type StoreMethods = {
    addInvoice: (invoice: Invoice) => any;
    setInvoices: (invoices: Invoice[]) => any;
    setInvoiceDetails: (invoice: Invoice) => any;
    setInvoiceForm: (invoice: Invoice) => any;
    toggleFilter: (filter: string) => any;
    getFilteredInvoices: () => any;
    setUser: (user: User) => any;
    resetStore: () => any;
    setAppLoading: (val: boolean) => any;
};
type StoreType = StoreState & StoreMethods;

const initialState: StoreState = {
    invoices: [],
    filteredInvoices: [],
    invoiceDetails: null,
    invoiceForm: null,
    selectedFilters: {
        draft: true,
        pending: true,
        paid: true,
    },
    user: null,
    appLoading: false,
};

export const useStore = createStore<StoreType>((set, get) => ({
    ...initialState,

    setAppLoading: (val: boolean) =>
        set((state: StoreState) => {
            return { appLoading: val };
        }),
    resetStore: () =>
        set((state: StoreState) => {
            return { ...initialState };
        }),
    setUser: (user: User) =>
        set((state: StoreState) => {
            return { user };
        }),
    addInvoice: (invoice: Invoice) =>
        set((state: StoreState) => {
            return { invoices: [...state.invoices, invoice] };
        }),
    setInvoices: (invoices: Invoice[]) =>
        set((state: StoreState) => {
            setTimeout(() => {
                get().getFilteredInvoices();
            }, 0);
            return { invoices };
        }),
    setInvoiceDetails: (invoice: Invoice) =>
        set((state: StoreState) => {
            return { invoiceDetails: invoice };
        }),
    setInvoiceForm: (invoice: Invoice) =>
        set((state: StoreState) => {
            return { invoiceForm: invoice };
        }),
    toggleFilter: (filter: string) =>
        set((state: StoreState) => {
            const filters = state.selectedFilters;
            filters[filter] = !filters[filter];
            get().getFilteredInvoices();

            return { selectedFilters: filters };
        }),
    getFilteredInvoices: () =>
        set((state: StoreState) => {
            const invoices = state.invoices;
            const filters = state.selectedFilters;
            const result = invoices.filter((invoice, index) => {
                if (
                    (filters["draft"] && invoice.status == "draft") ||
                    (filters["paid"] && invoice.status == "paid") ||
                    (filters["pending"] && invoice.status == "pending") ||
                    (!filters["draft"] &&
                        !filters["paid"] &&
                        !filters["pending"])
                ) {
                    return invoices;
                }
            });
            return { filteredInvoices: result };
        }),
}));
