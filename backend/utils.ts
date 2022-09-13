import { Address, Item, NewInvoiceEntry, Status } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isValidEmail = (email: string): boolean => {
  const regex = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
  return regex.test(email);
};

const isStatus = (status: any): status is Status => {
  return Object.values(Status).includes(status);
};

const isValidPrice = (price: number): boolean => {
  return price.toFixed(2).split('.')[1].length === 2;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date' + date);
  }

  return date;
};

const parseDescription = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('missing or invalid description');
  }

  return text;
};

const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error(`invalid or missing number ${number}`);
  }

  return number;
};

const parseClientName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('invalid or missing name' + name);
  }

  return name;
};

const parseEmail = (email: unknown): string => {
  if (!email) return '';
  if (!isString(email) || !isValidEmail(email)) {
    throw new Error('invalid or missing email' + email);
  }

  return email;
};

const parseStatus = (status: unknown): Status => {
  if (!status || !isString(status) || !isStatus(status)) {
    throw new Error('invalid or missing status' + status);
  }

  return status;
};

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error('invalid or missing string' + string);
  }
  return string;
};

const parsePrice = (price: unknown): number => {
  if (!price || !isNumber(price) || !isValidPrice(price)) {
    throw new Error('invalid or missing price' + price);
  }

  return price;
};

const parseItems = (items: unknown): Item[] => {
  if (!items || !Array.isArray(items)) {
    throw new Error('invalid or missing items' + items);
  }

  return items.map(item => {
    return {
      name: item.status === 'draft' ? parseStringDraft(item.name) : parseString(item.name),
      quantity: item.status === 'draft' ? parseNumericDraft(item.quantity) : parseNumber(item.quantity),
      price: item.status === 'draft' ? parseNumericDraft(item.price) : parsePrice(item.price),
      total: item.status === 'draft' ? parseNumericDraft(item.total) : parsePrice(item.total),
    };
  });
};

const parseStringDraft = (item: unknown): string => {
  if (!isString(item)) {
    throw new Error('item is not a string' + item);
  }

  return item;
};

const parseNumericDraft = (item: unknown): number => {
  if (item === 0) {
    console.log('inside');
    return 0;
  }

  if (!isNumber(item)) {
    throw new Error('item is not a number ' + item);
  }

  return item;
};


type NewInvoiceFields = { createdAt: unknown, paymentDue: unknown, description: unknown, paymentTerms: unknown, clientName: unknown, clientEmail: unknown, status: unknown, senderAddress: Address, clientAddress: Address, items: unknown, total: unknown };

export const toNewInvoiceEntry = (object: NewInvoiceFields): NewInvoiceEntry => {
  const newEntry: NewInvoiceEntry = {
    createdAt: parseDate(object.createdAt),
    paymentDue: object.status === Status.Draft ? parseStringDraft(object.paymentDue) : parseDate(object.paymentDue),
    description: object.status === Status.Draft ? parseStringDraft(object.description) : parseDescription(object.description),
    paymentTerms: object.status === Status.Draft ? parseNumericDraft(object.paymentTerms) : parseNumber(object.paymentTerms),
    clientName: object.status === Status.Draft ? parseStringDraft(object.clientName) : parseClientName(object.clientName),
    clientEmail: object.status === Status.Draft ? parseStringDraft(object.clientEmail) :parseEmail(object.clientEmail),
    status: parseStatus(object.status),
    senderAddress: {
      street: object.status === Status.Draft ? parseStringDraft(object.senderAddress.street) : parseString(object.senderAddress.street),
      city: object.status === Status.Draft ? parseStringDraft(object.senderAddress.city) : parseString(object.senderAddress.city),
      postCode: object.status === Status.Draft ? parseStringDraft(object.senderAddress.postCode) : parseString(object.senderAddress.postCode),
      country: object.status === Status.Draft ? parseStringDraft(object.senderAddress.country) : parseString(object.senderAddress.country),
    },
    clientAddress: {
      street: object.status === Status.Draft ? parseStringDraft(object.clientAddress.street) : parseString(object.clientAddress.street),
      city: object.status === Status.Draft ? parseStringDraft(object.clientAddress.city) : parseString(object.clientAddress.city),
      postCode: object.status === Status.Draft ? parseStringDraft(object.clientAddress.postCode) : parseString(object.clientAddress.postCode),
      country: object.status === Status.Draft ? parseStringDraft(object.clientAddress.country) : parseString(object.clientAddress.country),
    },
    items: parseItems(object.items),
    total: object.status === Status.Draft ? parseNumericDraft(object.total) : parsePrice(object.total),
  };

  return newEntry;
};