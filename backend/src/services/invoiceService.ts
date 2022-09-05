import { invoices } from '../../data/invoices';
import { InvoiceEntry, PreviewDataForInvoiceEntry } from '../../types';
import { v1 as uuid } from 'uuid';

const getInvoices = (): InvoiceEntry[] => {
  return invoices;
};
const getPreviewDataForInvoiceEntry = (): PreviewDataForInvoiceEntry[] => {
  return invoices.map(({ id, paymentDue, clientName, total, status }) => ({
    id,
    paymentDue,
    clientName,
    total,
    status,
  }));
};
const getSingleInvoice = (id: string): InvoiceEntry | undefined => {
  const invoice = invoices.find(i => i.id === id);
  return invoice;
};
const addInvoice = (newInvoice): InvoiceEntry => {
  const newInvoiceEntry = {
    id: uuid().substring(0, 5),
    ...newInvoice
  };

  invoices.push(newInvoiceEntry);

  return newInvoiceEntry;
};
const deleteInvoice = () => {
  //
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