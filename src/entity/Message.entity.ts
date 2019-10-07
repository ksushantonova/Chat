import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Message extends BaseEntity{
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
