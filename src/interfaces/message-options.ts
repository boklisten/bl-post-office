export interface MessageOptions {
  type: 'receipt' | 'reminder';
  messages?: any[];
  textBlocks?: {text: string}[];
}
