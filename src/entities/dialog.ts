import { BaseEntity } from 'typeorm';

export interface Dialog extends BaseEntity{
  dialogId: string;
  messageId: string;
}
