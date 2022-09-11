export type PreviewDataForInvoiceEntry = Pick<InvoiceEntry, 'id' | 'paymentDue' | 'clientName' | 'total' | 'status'>;
export type NewInvoiceEntry = Omit<InvoiceEntry, 'id'>;

export enum Status {
  Paid = 'paid',
  Pending = 'pending',
  Draft = 'draft',
}

export interface Address {
  street: string,
  city: string,
  postCode: string,
  country: string,
}

export interface Item {
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