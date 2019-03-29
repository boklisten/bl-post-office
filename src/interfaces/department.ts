import {MessageOptions} from '../interfaces/message-options';
import {Recipient} from '../interfaces/reciptient';

export interface Department {
  send(recipients: Recipient[], options: MessageOptions): Promise<boolean>;
}
