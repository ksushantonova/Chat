import { TypeOrmMessageRepository } from '../typeorm/repositories/message';
import { decryptMessage } from '../decrypt';

interface UserMessage {
  message: string;
  username: string;
  userId: string;
}

export interface MessageData {
  message: string;
  userId: string;
  dialogId: string;
  id: string;
  time: Date;
}

export class MessageController {
  saveMessage(data: string, messageId: string, dialogId: string) {
    const receivedData: UserMessage = JSON.parse(data);
    const message = decryptMessage(receivedData.message);
    const messageData: MessageData = {
      message,
      dialogId,
      id: messageId,
      time: new Date(),
      userId: receivedData.userId,
    };
    const repository = new TypeOrmMessageRepository();
    repository.add(messageData);
  }
}
