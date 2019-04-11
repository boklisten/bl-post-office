export type MessageSubtype = 'partly-payment' | 'rent' | 'loan';
export type MessageType = 'reminder' | 'receipt';

export interface MessageOptions {
  type: MessageType;
  subtype: MessageSubtype;
  textBlocks?: {
    text: string;
    title?: string;
    regular?: boolean;
    secondary?: boolean;
    warning?: boolean;
    alert?: boolean;
  }[];
}
