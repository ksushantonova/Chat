import { createConnection } from 'typeorm';
import uniqid from 'uniqid';
import { UserController, UserData } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { DialogController } from './controllers/DialogController';
import srpBigint from 'srp-bigint';
import bufferJson from 'buffer-json';

const database = createConnection();

interface LoginData {
  identity: any;
}

export default class Server {
  userController: UserController;
  messageController: MessageController;
  dialogController: DialogController;
  incomeData: UserData;
  dialogId: string;
  s: any;
  user: any;

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
    data.verifier = bufferJson.stringify(data.verifier);
    data.salt = bufferJson.stringify(data.salt);
    data.identity = bufferJson.stringify(data.identity);
    this.userController.saveUser(data);
  }

  async getSalt(data: LoginData) {
    this.user = await this.userController.getUser(data.identity);
    return this.user.salt;
  }

  async auntUser(res: any) {
    const params = srpBigint.params['2048'];
    const secret2 = await srpBigint.genKey();
    if (this.user) {
      this.s = new srpBigint.Server(params, bufferJson.parse(this.user.verifier), secret2);
    } else {
      this.s = new srpBigint.Server(params, Buffer.from(this.incomeData.verifier.data), secret2);
    }
    const srpB = this.s.computeB();
    const str = bufferJson.stringify({ buf: srpB });
    res.send(str);
  }

  aunthUserStepTwo(data: any, res: any) {
    this.s.setA(Buffer.from(data.sprA.data));
    this.s.checkM1(Buffer.from(data.m1));
    const K = this.s.computeK();
    const str = bufferJson.stringify({ buf: K });
    res.send(str);
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
