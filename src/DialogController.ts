import { TypeOrmDialogRepository } from './typeorm/repositories/dialog';

export interface DialogData {
  messageId: string;
  dialogId: string;
}

export class DialogController {
  dialogId: string;

  saveDialog(messageId: string, dialogId: string) {
    if (!this.dialogId) {
      this.dialogId = dialogId;
    }
    const dialogData: DialogData = {
      messageId,
      dialogId,
    };
    const repository = new TypeOrmDialogRepository();
    repository.add(dialogData);
  }
}
