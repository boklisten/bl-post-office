import {Recipient} from '../interfaces/reciptient';
import {MessageOptions} from '../interfaces/message-options';

export interface DepartmentHandler {
  send(recipient: Recipient, options: MessageOptions): Promise<boolean>;
}
