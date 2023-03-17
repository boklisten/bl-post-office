import { injectable } from "inversify";
import * as sendgrid from "@sendgrid/mail";
import "reflect-metadata";
import { logger } from "../../../logger";
import { EMAIL_SETTINGS } from "../../email-settings";
import { EmailContent } from "../../email-content";

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
              name: content.fromName
            },
            subject: content.subject,
            html: content.html,
            custom_args: {
              bl_message_id: content.message_id,
              bl_message_user_id: content.user_id,
              bl_message_type: content.type,
              bl_message_subtype: content.subtype,
              bl_message_sequence_number: content.sequence_number
                ? content.sequence_number
                : 0
            }
          } as any,
          false,
          (err: any, result: any) => {
            if (err) {
              return reject(
                `[message_id: ${
                  content.message_id
                }]: Sendgrid.send() failed to send: ${err}`
              );
            }
            logger.verbose(
              `[message_id: ${
                content.message_id
              }]: Sendgrid.send() successfully sent email request`
            );
            resolve(result);
          }
        );
      } catch (e) {
        reject(
          `[message_id: ${content.message_id}]: Sendgrid.send() failed: ${e}`
        );
      }
    });
  }

  private handleCallback() {}
}
