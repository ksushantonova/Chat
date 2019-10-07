import { DatabaseController } from './DatabaseController';

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
  saveMessage(data: string, messageId: string, dialogId: string, database: DatabaseController) {
    const receivedData: UserMessage = JSON.parse(data);
    const messageData: MessageData = {
      dialogId,
      messageId,
      time: new Date(),
      userId: receivedData.userId,
      message: receivedData.message,
    };
    database.addToTable(messageData, 'message');
  }
}
