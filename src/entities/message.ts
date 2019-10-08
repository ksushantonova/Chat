import { BaseEntity } from 'typeorm';

export interface Message extends BaseEntity {
  messageId: string;
  time: Date;
  userId: string;
  dialogId: string;
  message: string;
}
