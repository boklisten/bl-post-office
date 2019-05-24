import {TextBlock} from './message-options';
import {ItemList} from './reciptient';

export interface EmailTemplateInput {
  textBlocks?: TextBlock[];
  name?: string;
  itemList?: ItemList;
}
