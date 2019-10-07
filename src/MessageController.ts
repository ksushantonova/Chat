import { Message } from './entity/Message.entity';

interface UserMessage {
  message: string;
  username: string;
  userId: string;
}

interface MessageData {
  message: string;
  userId: string;
  dialogId: string;
  messageId: string;
  time: Date;
}

export class MessageController {
  getRepository: any;

  constructor(getRepository: any) {
    this.getRepository = getRepository;
  }

  connect(data: string, messageId: string, dialogId: string) {
    const receivedData: UserMessage = JSON.parse(data);
    const messageData: MessageData = {
      dialogId,
      messageId,
      time: new Date(),
      userId: receivedData.userId,
      message: receivedData.message,
    };
    this.addToTable(messageData);
  }

  async addToTable(data: MessageData) {
    const repo = this.getRepository(Message);
    const result = repo.create(data);
    await repo.save(result);
  }
}
