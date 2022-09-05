export type Status = 'paid' | 'pending' | 'paid' | 'draft';
export type PreviewDataForInvoiceEntry = Pick<InvoiceEntry, 'id' | 'paymentDue' | 'clientName' | 'total' | 'status'>;

interface Address {
  street: string,
  city: string,
  postCode: string,
  country: string,
}

interface Item {
  name: string,
  quantity: number,
  price: number,
  total: number,
}

export interface InvoiceEntry {
  id: string,
  createdAt: string,
  paymentDue: string,
  description: string,
  paymentTerms: number,
  clientName: string,
  clientEmail: string,
  status: Status,
  senderAddress: Address,
  clientAddress: Address,
  items: Item[],
  total: number,
}