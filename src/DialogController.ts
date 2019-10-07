import { Dialog } from './entity/DialogUsers.entity';

interface DialogData {
  messageId: string;
  dialogId: string;
}

export class DialogController {
  getRepository: any;
  dialogId: string;

  constructor(getRepository: any) {
    this.getRepository = getRepository;
  }

  connect(messageId: string, dialogId: string) {
    if (!this.dialogId) {
      this.dialogId = dialogId;
    }
    const dialogData: DialogData = {
      messageId,
      dialogId,
    };
    this.addToTable(dialogData);
  }

  async addToTable(data: DialogData) {
    const repo = this.getRepository(Dialog);
    const result = repo.create(data);
    await repo.save(result);
  }
}
