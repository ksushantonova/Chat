import uniqid from 'uniqid';
import Socket from './Socket';
import { Users } from './entity/Users.entity';
import { Message } from './entity/Message.entity';
import { Dialog } from './entity/DialogUsers.entity';
import { Connection } from 'typeorm';

interface UserData {
  id: string;
  name: string;
  email: string;
  pass: string;
  userId: string;
}

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

interface DialogData {
  messageId: string;
  dialogId: string;
}

export class ChatController {
  socket: Socket;
  tempUser: string;
  dialogId: string;
  database: Promise<Connection>;
  getRepository: any;

  constructor(database: Promise<Connection>, getRepository: any) {
    this.database = database;
    this.getRepository = getRepository;
  }

  init(data: string) {
    this.tempUser = data;
    this.dialogId = null;
  }

  connect(userSocket: Socket) {
    this.socket = userSocket;
    this.socket.emit('initUser', this.tempUser);
    this.socket.onMessage(this.dialogId || uniqid());
  }

  onMessage(dialogId: string) {
    this.dialogId = dialogId;
    this.socket.on('message', (data: string) => {
      const receivedData: UserMessage = JSON.parse(data);
      const message: UserMessage = {
        message: receivedData.message,
        username: receivedData.username,
        userId: receivedData.userId,
      };
      this.socket.emit('message', JSON.stringify(message));
      this.writeMessageToDatabase(message, this.dialogId);
    });
  }

  writeMessageToDatabase(data: UserMessage, dialogId: string) {
    const messageId: string = uniqid();
    const messageData: MessageData = {
      messageId,
      dialogId,
      time: new Date(),
      userId: data.userId,
      message: data.message,
    };
    const dialogData: DialogData = {
      messageId,
      dialogId,
    };
    this.addToTable(messageData, 'message');
    this.addToTable(dialogData, 'dialog');
  }

  async addToTable(data: MessageData | DialogData | UserData, type: string) {
    const repository = type === 'message' ? Message : type === 'user' ? Users : Dialog;
    const repo = this.getRepository(repository);
    const result = repo.create(data);
    await repo.save(result);
  }
}
