export type MessageType =
  | "reminder"
  | "custom-reminder"
  | "receipt"
  | "generic"
  | "match"
  | "booking";
export type MessageSubtype =
  | "partly-payment"
  | "rent"
  | "loan"
  | "none"
  | "confirmed"
  | "canceled";
import { MessageMediums } from "./message-mediums";
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
  htmlContent?: string;
  customContent?: string;
  subject?: string;
  textBlocks?: TextBlock[];
}
