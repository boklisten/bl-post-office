export type MessageSubtype = 'partly-payment' | 'rent' | 'loan';
export type MessageType = 'reminder' | 'receipt';
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
  textBlocks?: TextBlock[];
}
