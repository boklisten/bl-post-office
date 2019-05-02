export interface EmailContent {
  to: string;
  from: string;
  fromName: string;
  subject: string;
  html: string;
  message_id: string;
  user_id: string;
  sequence_number?: number;
  type: any;
  subtype: any;
}
