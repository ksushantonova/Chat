import { createConnection } from 'typeorm';
import uniqid from 'uniqid';
import bufferJson from 'buffer-json';
import { UserController } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { DialogController } from './controllers/DialogController';
import { User } from './entities/user';

const database = createConnection();

interface LoginData {
  identity: any;
}

export default class Server {
  userController: UserController;
  messageController: MessageController;
  dialogController: DialogController;
  incomeData: any;
  dialogId: string;
  s: any;
  user: any;
  encryptKey: any;

  constructor(
    userController: UserController,
    messageController: MessageController,
    dialogController: DialogController,
  ) {
    this.userController = userController;
    this.messageController = messageController;
    this.dialogController = dialogController;
    this.dialogId = uniqid();
    this.initDatabase();
  }

  handleUser(data: User) {
    data.id = uniqid();
    data.verifier = bufferJson.stringify(data.verifier);
    data.salt = bufferJson.stringify(data.salt);
    data.identity = bufferJson.stringify(data.identity);
    this.incomeData = data;
    this.userController.saveUser(data);
  }

  async getSalt(data: LoginData) {
    this.incomeData = await this.userController.getUser(data.identity);
    this.incomeData.verifier = bufferJson.parse(this.incomeData.verifier);
    return this.incomeData.salt;
  }

  handleMessage(data: string, messageId: string) {
    this.messageController.saveMessage(data, messageId, this.dialogId);
  }

  handleDialogMessage(messageId: string) {
    this.dialogController.saveDialog(messageId, this.dialogId);
  }

  initDatabase() {
    database.then(() => {
      console.log('database inited');
    });
  }
}
