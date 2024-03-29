import { MessageMediums } from "./message-mediums";

export type ItemList = {
  summary: {
    title?: string;
    total: string; // the total of the list (with currency notation)
    totalTax: string; // the total tax of the list (with currency notation)
    totalLeftToPay?: string; // the total of all items.leftToPay
    taxPercentage: string; // the tax percentage of the list
    taxPercentageLeftToPay?: string;
    totalTaxLeftToPay?: string;
  };
  items: {
    id: string; // the id of the item
    title: string; // the title of the item
    action?: string; // the action of the item, ex 'partly-payment'
    deadline?: string; // the deadline of the item
    amount?: string; // the amount payed
    leftToPay?: string; // amount left to pay
    total?: string; // amount total
  }[];
};

export type Order = {
  id?: string;
};

export type Booking = {
  date: string;
  hour: string;
  branch: string;
  address: string;
};

export type EmailContentSettings = {
  text?: {
    deadline: string;
  };
  display?: {
    leftToPay?: boolean;
    payment?: boolean;
    deadline?: boolean;
    delivery?: boolean;
  };
};

export type Delivery = {
  address: string;
  expectedDeliveryDate: string;
  method: string;
  unitPrice: string;
  total: string;
  taxPercentage: string;
  totalTax: string;
};

export type Payment = {
  total: string;
  totalPayed: string; // the amount the customer has payed in total for this order
  reservation: boolean; // if the order is just a reservation, and the customer has not payed anything
  payments: {
    id: string; // id of payment
    method: string; // method of payment, ex: VISA
    status: string; // status of payment, ex: Confirmed
    amount: string; // amount payed
    cardNumber?: string;
  }[];
};

export interface Recipient {
  user_id: string;
  message_id: string;
  email?: string;
  phone?: string;
  name?: string;
  dob?: string;
  itemList?: ItemList;
  delivery?: Delivery;
  payment?: Payment;
  order?: Order;
  booking?: Booking;
  settings?: EmailContentSettings;
  mediumOverrides?: MessageMediums;
}
