import {injectable} from 'inversify';
import 'reflect-metadata';
import {logger} from '../../../logger';

@injectable()
export class TwilioConnecter {
  public async send(
    toNumber: string,
    fromNumber: string,
    text: string,
    blMessageId: string,
  ): Promise<any> {
    const twilioClient = require('twilio')(
      process.env.TWILIO_SMS_SID,
      process.env.TWILIO_SMS_AUTH_TOKEN,
    );

    try {
      const res = twilioClient.messages.create({
        body: text,
        from: fromNumber,
        to: toNumber,
        statusCallback:
          process.env.TWILIO_STATUS_CALLBACK_URL +
          `?bl_message_id=${blMessageId}`,
      });
      logger.info(`successfully sent SMS to "${toNumber}"`);
      return res;
    } catch (e) {
      logger.error(`failed to send SMS to "${toNumber}", reason: ${e}`);
      throw e;
    }
  }
}
