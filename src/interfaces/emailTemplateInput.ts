import { TextBlock } from "./message-options";
import {
  Order,
  ItemList,
  EmailContentSettings,
  Delivery,
  Payment,
  Booking
} from "./reciptient";

export interface EmailTemplateInput {
  textBlocks?: TextBlock[];
  name?: string;
  itemList?: ItemList;
  settings?: EmailContentSettings;
  payment?: Payment;
  delivery?: Delivery;
  order?: Order;
  booking?: Booking;
  htmlContent?: string;
}
