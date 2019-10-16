import uniqid from 'uniqid';
import { SocketComponent } from './socket-component';
import { UserController } from '../controllers/UserController';
import { DialogController } from '../controllers/DialogController';
import { MessageController } from '../controllers/MessageController';
import Server from '../Server';

const userController = new UserController();
const messageController = new MessageController();
const dialogController = new DialogController();
export const mainServer = new Server(userController, messageController, dialogController);

export class UserSocket extends SocketComponent {
  constructor(ioSocket: any, socket: any) {
    super();
    this.ioSocket = ioSocket;
    this.socket = socket;
    const data = {
      incomeData: mainServer.incomeData,
    };
    this.ioSocket.emit('initUser', JSON.stringify(data));
  }

  socket: any;
  ioSocket: any;

  pushMessage(io: any, data: string) {
    const messageId = uniqid();
    mainServer.handleMessage(data, messageId);
    mainServer.handleDialogMessage(messageId);
    io.emit('push_message', data);
  }
}
