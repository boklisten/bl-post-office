import {MessageMediums} from './message-mediums';

export type ItemList = {
  summary: {
    title?: string;
    total: string; // the total of the list (with currency notation)
    totalTax: string; // the total tax of the list (with currency notation)
    totalLeftToPay?: string; // the total of all items.leftToPay
    taxPercentage: string; // the tax percentage of the list
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

export type Delivery = {
  address: string;
  expectedDeliveryDate: string;
  method: string;
  unitPrice: string;
  total: string;
  taxPercentage: string;
  totalTax: string;
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
  mediumOverrides?: MessageMediums;
}
