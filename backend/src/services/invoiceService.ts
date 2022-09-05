import { invoices } from '../../data/invoices';

const getInvoices = () => {
  return invoices;
};
const getPreviewDataForInvoiceEntry = () => {
  return invoices.map(({ id, paymentDue, clientName, total, status }) => ({
    id,
    paymentDue,
    clientName,
    total,
    status,
  }));
};
const addInvoice = () => {
  //
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
};