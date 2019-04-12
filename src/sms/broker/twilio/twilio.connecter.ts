import {injectable} from 'inversify';
import 'reflect-metadata';
import {logger} from '../../../logger';

@injectable()
export class TwilioConnecter {
  public async send(
    toNumber: string,
    fromNumber: string,
    text: string,
  ): Promise<any> {
    logger.info(process.env.TWILIO_SMS_SID);
    logger.info(process.env.TWILIO_SMS_AUTH_TOKEN);

    const twilioClient = require('twilio')(
      process.env.TWILIO_SMS_SID,
      process.env.TWILIO_SMS_AUTH_TOKEN,
    );

    try {
      const res = twilioClient.messages.create({
        body: text,
        from: fromNumber,
        to: toNumber,
      });
      logger.info(`Successfully sent SMS to "${toNumber}"`);
      return res;
    } catch (e) {
      logger.error(`Failed to send SMS to "${toNumber}", reason: ${e}`);
      throw e;
    }
  }
}
