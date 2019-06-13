export type MessageSubtype = 'partly-payment' | 'rent' | 'loan' | 'all';
export type MessageType = 'reminder' | 'receipt' | 'generic';
import {MessageMediums} from './message-mediums';
export type TextBlock = {
  text: string;
  title?: string;
  regular?: boolean;
  secondary?: boolean;
  warning?: boolean;
  alert?: boolean;
};

export interface MessageOptions {
  type: MessageType;
  subtype: MessageSubtype;
  sequence_number?: number;
  mediums?: MessageMediums;
  textBlocks?: TextBlock[];
}
