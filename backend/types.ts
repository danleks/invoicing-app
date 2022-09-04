export type Status = 'paid' | 'pending' | 'paid' | 'draft';

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

export interface Invoice {
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