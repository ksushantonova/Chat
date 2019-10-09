import { createConnection } from 'typeorm';
import uniqid from 'uniqid';
import { UserController, UserData } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { DialogController } from './controllers/DialogController';
import { server } from './app';
import { UserSocket } from './Socket';

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

  initPostMethod(data: UserData) {
    data.userId = uniqid();
    this.incomeData = data;
    this.userController.saveUser(data);
  }

  initSocketConnection(socket: UserSocket) {
    socket.emit('initUser', JSON.stringify(this.incomeData));
  }

  handleMesage(data: string, messageId: string) {
    this.messageController.saveMessage(data, messageId, this.dialogId);
  }

  handleDialogMessage(messageId: string) {
    this.dialogController.saveDialog(messageId, this.dialogId);
  }

  initDatabase() {
    database.then(() => {
      server.listen(process.env.PORT, () => {
        console.log(`listening on *:${process.env.PORT}`);
      });
    });
  }
}
