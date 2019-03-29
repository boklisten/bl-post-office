export interface MessageOptions {
  type: 'reminder' | 'receipt';
  subtype?: 'partly-payment' | 'rent' | 'loan';
  textBlocks?: {
    text: string;
    title?: string;
    regular?: boolean;
    secondary?: boolean;
    warning?: boolean;
    alert?: boolean;
  }[];
}
