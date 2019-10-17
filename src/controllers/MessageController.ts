import { TypeOrmMessageRepository } from '../typeorm/repositories/message';
import { mainServer } from '../sockets/user-socket-component';

interface UserMessage {
  message: string;
  username: string;
  userId: string;
}

export interface MessageData {
  message: string;
  userId: string;
  dialogId: string;
  messageId: string;
  time: Date;
}

export class MessageController {
  saveMessage(data: string, messageId: string, dialogId: string) {
    const receivedData: UserMessage = JSON.parse(data);
    const message = mainServer.decryptMessage(receivedData.message);
    const messageData: MessageData = {
      dialogId,
      messageId,
      message,
      time: new Date(),
      userId: receivedData.userId,
    };
    const repository = new TypeOrmMessageRepository();
    repository.add(messageData);
  }
}
