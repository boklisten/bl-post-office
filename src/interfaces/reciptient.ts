import {MessageMediums} from './message-mediums';

export type ItemList = {
  summary: {
    title?: string;
    total: string; // the total of the list (with currency notation)
    totalTax: string; // the total tax of the list (with currency notation)
    taxPercentage: string; // the tax percentage of the list
  };
  items: {
    id: string; // the id of the item
    title: string; // the title of the item
    deadline: string; // the deadline of the item
    leftToPay: string; // amount left to pay
  }[];
};

export interface Recipient {
  email?: string;
  phone?: string;
  name?: string;
  dob?: string;
  itemList?: ItemList;
  mediumOverrides?: MessageMediums;
}
