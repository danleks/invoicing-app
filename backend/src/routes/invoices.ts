import express from 'express';
import invoiceService from '../services/invoiceService';

const router = express.Router();

router.post('/', (_req, res) => {
  res.send('saving an invoice');
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