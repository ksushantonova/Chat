import { DialogModel } from '../models/dialog.entity';
import { Dialog } from '../../entities/dialog';
import { getConnection } from 'typeorm';
import { DialogData } from '../../DialogController';

export class TypeOrmDialogRepository {
  public async add(dialog: DialogData): Promise<Dialog> {
    if (dialog.dialogId) {
      await getConnection()
      .createQueryBuilder()
      .insert()
      .into(DialogModel)
      .values(dialog)
      .execute();
    }
    return;
  }
}
