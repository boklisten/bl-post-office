import {injectable} from 'inversify';
import {TwilioConnecter} from './twilio/twilio.connecter';
import {SMS_SETTINGS} from '../sms-settings';

@injectable()
export class SmsBroker {
  constructor(private _connecter: TwilioConnecter) {}

  public async send(
    toPhoneNumber: string,
    fromPhoneNumber: string,
    text: string,
    blMessageId: string,
  ): Promise<any> {
    this.validatePhoneNumber(toPhoneNumber);
    this.validatePhoneNumber(fromPhoneNumber);
    this.validateText(text);

    return await this._connecter.send(
      toPhoneNumber,
      fromPhoneNumber,
      text,
      blMessageId,
    );
  }

  private validatePhoneNumber(phoneNumber: any) {
    const reg = /^\+47[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/g;

    if (!phoneNumber || !reg.test(phoneNumber)) {
      throw `phone number "${phoneNumber}" is not a valid phone number`;
    }
  }

  private validateText(text: any) {
    let reason = null;

    if (!text) {
      reason = 'text is undefined';
    } else if (text.length < SMS_SETTINGS.minLength) {
      reason = `text is to short, must be at least ${
        SMS_SETTINGS.minLength
      } characters, it was ${text.length}`;
    } else if (text.length > SMS_SETTINGS.maxLength) {
      reason = `text is to long, can not be over ${
        SMS_SETTINGS.maxLength
      } characters, it was ${text.length}`;
    }

    if (reason !== null) {
      throw `sms text is not valid: "${text}", reason: ${reason}`;
    }
  }
}
