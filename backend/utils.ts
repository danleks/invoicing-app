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
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  return regex.test(email);
};

const isStatus = (status: any): status is Status => {
  return Object.values(Status).includes(status);
};

const isObject = (object: unknown): object is object => {
  return typeof object === 'object' && !Array.isArray(object);
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
    throw new Error('invalid or missing number' + number);
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
  if (!email || !isString(email) || !isValidEmail(email)) {
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
  if (!string || !isString(string)) {
    throw new Error('invalid or missing string' + string);
  }
  return string;
};

const parseAddress = (object: Address): Address => {

  if (!object || !isObject(object)) {
    throw new Error('missing or invalid address object' + object);
  }

  const address = {
    street: parseString(object.street),
    city: parseString(object.city),
    postCode: parseString(object.postCode),
    country: parseString(object.country),
  };

  return address;
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
      name: parseString(item.name),
      quantity: parseNumber(item.quantity),
      price: parsePrice(item.price),
      total: parsePrice(item.total),
    };
  });
};

type Fields = { createdAt: unknown, paymentDue: unknown, description: unknown, paymentTerms: unknown, clientName: unknown, clientEmail: unknown, status: unknown, senderAddress: Address, clientAddress: Address, items: unknown, total: unknown };

export const toNewInvoiceEntry = (object: Fields): NewInvoiceEntry => {
  const newEntry: NewInvoiceEntry = {
    createdAt: parseDate(object.createdAt),
    paymentDue: parseDate(object.paymentDue),
    description: parseDescription(object.description),
    paymentTerms: parseNumber(object.paymentTerms),
    clientName: parseClientName(object.clientName),
    clientEmail: parseEmail(object.clientEmail),
    status: parseStatus(object.status),
    senderAddress: parseAddress(object.senderAddress),
    clientAddress: parseAddress(object.clientAddress),
    items: parseItems(object.items),
    total: parsePrice(object.total),
  };

  return newEntry;
};