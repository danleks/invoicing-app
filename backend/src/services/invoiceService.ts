import { invoiceEntries } from '../../data/invoices';
import { InvoiceEntry, NewInvoiceEntry, PreviewDataForInvoiceEntry } from '../../types';
import { v1 as uuid } from 'uuid';

const getInvoices = (): InvoiceEntry[] => {
  return invoiceEntries;
};
const getPreviewDataForInvoiceEntry = (): PreviewDataForInvoiceEntry[] => {
  return invoiceEntries.map(({ id, paymentDue, clientName, total, status }) => ({
    id,
    paymentDue,
    clientName,
    total,
    status,
  }));
};
const getSingleInvoice = (id: string): InvoiceEntry | undefined => {
  const invoice = invoiceEntries.find(i => i.id === id);
  return invoice;
};
const addInvoice = (newInvoice: NewInvoiceEntry): InvoiceEntry => {
  const id: string = uuid();
  const newInvoiceEntry = {
    id,
    ...newInvoice
  };
  invoiceEntries.push(newInvoiceEntry);
  return newInvoiceEntry;
};
const deleteInvoice = (id: string) => {
  invoiceEntries.filter(i => i.id === id);
};
const updateInvoice = () => {
  //
};

export default {
  getInvoices,
  addInvoice,
  deleteInvoice,
  updateInvoice,
  getPreviewDataForInvoiceEntry,
  getSingleInvoice,
};