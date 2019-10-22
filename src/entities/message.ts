import { BaseEntity } from 'typeorm';

export interface Message extends BaseEntity {
  id: string;
  time: Date;
  userId: string;
  dialogId: string;
  message: string;
}
