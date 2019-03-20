import {MessageMediums} from './message-mediums';

export interface Recipient {
  email?: string;
  phone?: string;
  name?: string;
  dob?: string;
  messageMediumOverrides?: MessageMediums;
}
