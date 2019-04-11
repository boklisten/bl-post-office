import {injectable} from 'inversify';
import * as sendgrid from '@sendgrid/mail';
import 'reflect-metadata';

@injectable()
export class SendgridConnecter {
  public send(
    toEmail: string,
    fromEmail: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

    return new Promise((resolve, reject) => {
      try {
        sendgrid.send(
          {
            to: toEmail,
            from: fromEmail,
            subject: subject,
            html: html,
          },
          false,
          (err: any, result: any) => {
            if (err) {
              return reject(`Sendgrid.send() failed to send: ${err}`);
            }
            resolve(result);
          },
        );
      } catch (e) {
        reject(`Sendgrid.send() failed: ${e}`);
      }
    });
  }

  private handleCallback() {}
}
