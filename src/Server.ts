import { createConnection } from 'typeorm';
import uniqid from 'uniqid';
import { UserController, UserData } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { DialogController } from './controllers/DialogController';

const database = createConnection();

export default class Server {
  userController: UserController;
  messageController: MessageController;
  dialogController: DialogController;
  incomeData: UserData;
  dialogId: string;

  constructor(
    userController: UserController,
    messageController: MessageController,
    dialogController: DialogController) {
    this.userController = userController;
    this.messageController = messageController;
    this.dialogController = dialogController;
    this.dialogId = uniqid();
    this.initDatabase();
  }

  handleUser(data: UserData) {
    data.userId = uniqid();
    this.incomeData = data;
    this.userController.saveUser(data);
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
