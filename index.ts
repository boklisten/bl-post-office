import {PostOffice} from './src/post-office';
import {inversifyContainer} from './inversify.config';

export const postOffice = inversifyContainer.get<PostOffice>(PostOffice);
export {PostOffice} from './src/post-office';
export {MessageOptions} from './src/interfaces/message-options';
export {MessageMediums} from './src/interfaces/message-mediums';
export {
  Recipient,
  Delivery,
  Payment,
  Order,
  EmailContentSettings,
  ItemList,
} from './src/interfaces/reciptient';
