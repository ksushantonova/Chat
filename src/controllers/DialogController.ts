import { TypeOrmDialogRepository } from '../typeorm/repositories/dialog';

export interface DialogData {
  messageId: string;
  id: string;
}

export class DialogController {
  dialogId: string;

  saveDialog(messageId: string, dialogId: string) {
    if (!this.dialogId) {
      this.dialogId = dialogId;
    }
    const dialogData: DialogData = {
      messageId,
      id: dialogId,
    };
    const repository = new TypeOrmDialogRepository();
    repository.add(dialogData);
  }
}
