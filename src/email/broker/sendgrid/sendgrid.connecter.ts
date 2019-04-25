import {injectable} from 'inversify';
import * as sendgrid from '@sendgrid/mail';
import 'reflect-metadata';
import {logger} from '../../../logger';
import {EMAIL_SETTINGS} from '../../email-settings';
import {SendgridSendObject} from './sendgrid-send-object';
import {EmailContent} from '../../email-content';

@injectable()
export class SendgridConnecter {
  public send(content: EmailContent): Promise<boolean> {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

    return new Promise((resolve, reject) => {
      try {
        sendgrid.send(
          {
            to: content.to,
            from: {
              email: content.from,
              name: content.fromName,
            },
            subject: content.subject,
            html: content.html,
            custom_args: {
              message_id: content.message_id,
              user_id: content.user_id,
              type: content.type,
              subtype: content.subtype,
            },
          } as any,
          false,
          (err: any, result: any) => {
            if (err) {
              return reject(`Sendgrid.send() failed to send: ${err}`);
            }
            logger.verbose(
              `Sendgrid.send() successfully sent msg to "${content.to}"`,
            );
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
