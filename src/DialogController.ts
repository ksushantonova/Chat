import { DatabaseController } from './DatabaseController';

export interface DialogData {
  messageId: string;
  dialogId: string;
}

export class DialogController {
  dialogId: string;

  saveDialog(messageId: string, dialogId: string, database: DatabaseController) {
    if (!this.dialogId) {
      this.dialogId = dialogId;
    }
    const dialogData: DialogData = {
      messageId,
      dialogId,
    };
    database.addToTable(dialogData, 'dialog');
  }
}
