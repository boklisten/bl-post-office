import {MessageMediums} from './interfaces/message-mediums';

//
// User of PostOffice must activly set message mediums to TRUE
// if they shall be called
export type PostOfficeConfig = {
  reminder?: {
    mediums: MessageMediums;
  };
  generic?: {
    mediums: MessageMediums;
  };
  receipt?: {
    mediums: MessageMediums;
  };
  match?: {
    mediums: MessageMediums;
  };
};
