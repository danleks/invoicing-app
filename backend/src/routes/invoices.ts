import express from 'express';
import invoiceService from '../services/invoiceService';

const router = express.Router();

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, status, items, total } = req.body;

  const newInvoiceEntry = invoiceService.addInvoice({
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    status,
    items,
    total
  });

  res.json(newInvoiceEntry);
});

router.get('/', (_req, res) => {
  const invoices = invoiceService.getInvoices();

  if (invoices) {
    res.json(invoices);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id', (_req, res) => {
  res.send('fetching a single invoice');
});

router.put('/:id', (_req, res) => {
  res.send('Updating the invoice');
});

router.delete('/:id', (_req, res) => {
  res.send('deleting the invoice');
});

export default router;