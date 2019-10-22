import { BaseEntity } from 'typeorm';

export interface Dialog extends BaseEntity{
  id: string;
  messageId: string;
}
