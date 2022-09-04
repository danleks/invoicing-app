import express from 'express';
import invoicesRouter from './routes/invoices';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('ping');
});

app.use('/api/invoices', invoicesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});