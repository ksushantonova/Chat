import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Dialog extends BaseEntity {
  @PrimaryColumn('varchar', { length: 30, unique: true, name: 'dialog_id' })
  dialogId: string;

  @Column('varchar', { length: 30, name: 'message_id' })
  messageId: string;
}
