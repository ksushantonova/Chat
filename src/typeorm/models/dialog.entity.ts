import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { Dialog } from '../../entities/dialog';

@Entity({ name: 'dialogs' })
export class DialogModel extends BaseEntity implements Dialog {
  @PrimaryColumn('varchar', { length: 30, unique: true, name: 'dialog_id' })
  dialogId: string;

  @Column('varchar', { length: 30, name: 'message_id' })
  messageId: string;
}
