import createStore from "zustand";
import data from "./data.json";
import { Filter, filters } from "./filters";
import { Invoice } from "./types";

type StoreState = {
    invoices: Invoice[];
    filteredInvoices: Invoice[];
    invoiceDetails: Invoice | null;
    invoiceForm: Invoice | null;
    selectedFilters: any;
};
type StoreMethods = {
    addInvoice: (invoice: Invoice) => any;
    setInvoices: (invoices: Invoice[]) => any;
    setInvoiceDetails: (invoice: Invoice) => any;
    setInvoiceForm: (invoice: Invoice) => any;
    toggleFilter: (filter: string) => any;
    getFilteredInvoices: () => any;
};
type StoreType = StoreState & StoreMethods;

export const useStore = createStore<StoreType>((set, get) => ({
    invoices: [],
    filteredInvoices: [],
    invoiceDetails: null,
    invoiceForm: null,
    selectedFilters: {
        draft: true,
        pending: true,
        paid: true,
    },

    addInvoice: (invoice: Invoice) =>
        set((state: StoreState) => {
            return { invoices: [...state.invoices, invoice] };
        }),
    setInvoices: (invoices: Invoice[]) =>
        set((state: StoreState) => {
            setTimeout(() => {
                get().getFilteredInvoices()
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
                    filters['draft'] && invoice.status == 'draft' ||
                    filters['paid'] && invoice.status == 'paid' ||
                    filters['pending'] && invoice.status == 'pending' ||
                    (!filters['draft'] && !filters['paid'] && !filters['pending'])
                    ) {
                    return invoices
                }
            });
            return { filteredInvoices: result };
        }),
}));
