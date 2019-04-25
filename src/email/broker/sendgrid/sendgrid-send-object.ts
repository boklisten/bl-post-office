export interface SendgridSendObject {
  toEmail: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  html: string;
  message_id: string;
  user_id: string;
  type: any;
  subtype: any;
}
