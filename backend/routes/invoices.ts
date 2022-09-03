import express from 'express';

const router = express.Router();

router.post('/', (_req, res) => {
  res.send('saving an invoice');
});

router.get('/', (_req, res) => {
  res.send('Fetching all invoices');
});

router.put('/:id', (_req, res) => {
  res.send('Updating the invoice');
});

router.delete('/:id', (_req, res) => {
  res.send('deleting the invoice');
});

export default router;