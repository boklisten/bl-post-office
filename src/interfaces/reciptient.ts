import {MessageMediums} from './message-mediums';

export interface Recipient {
  email?: string;
  phone?: string;
  name?: string;
  dob?: string;
  itemList?: {
    id: string;
    title: string;
    status: string;
    amountLeftToPay: string;
    deadline: string;
  }[];
  messageMediumOverrides?: MessageMediums;
}
