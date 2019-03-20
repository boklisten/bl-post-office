import {reminderPage} from '../pages/reminder/reminder-page';
import {MessageOptions} from '../../interfaces/message-options';

export class ReminderHandler {
  public generateHtml(options: MessageOptions): string {
    return reminderPage;
  }
}
