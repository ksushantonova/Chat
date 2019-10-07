import { MessageData } from './MessageController';
import { DialogData } from './DialogController';
import { UserData } from './UserController';
import { Message } from './entity/Message.entity';
import { Users } from './entity/Users.entity';
import { Dialog } from './entity/DialogUsers.entity';

export class DatabaseController {
  getRepository: any;

  constructor(getRepository: any) {
    this.getRepository = getRepository;
  }
  async addToTable(data: MessageData | DialogData | UserData, type: string) {
    const repository = type === 'message' ? Message : type === 'user' ? Users : Dialog;
    const repo = this.getRepository(repository);
    const result = repo.create(data);
    await repo.save(result);
  }
}