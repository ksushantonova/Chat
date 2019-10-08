import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { Message } from '../../entities/message';

@Entity({ name: 'messages' })
export class MessageModel extends BaseEntity implements Message {
  @PrimaryColumn('varchar', { length: 30, unique: true, name: 'message_id' })
  messageId: string;

  @Column('varchar', { length: 30 })
  time: Date;

  @Column('varchar', { length: 30, name: 'user_id' })
  userId: string;

  @Column('varchar', { length: 30, name: 'dialog_id' })
  dialogId: string;

  @Column('varchar', { length: 500 })
  message: string;
}
