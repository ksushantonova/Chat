import { createConnection } from 'typeorm';
import uniqid from 'uniqid';
import aes256 from 'aes256';
import srpBigint from 'srp-bigint';
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
    data.userId = uniqid();
    this.incomeData = data;
    data.verifier = bufferJson.stringify(data.verifier);
    data.salt = bufferJson.stringify(data.salt);
    data.identity = bufferJson.stringify(data.identity);
    this.userController.saveUser(data);
  }

  async getSalt(data: LoginData) {
    this.incomeData = await this.userController.getUser(data.identity);
    this.incomeData.verifier = bufferJson.parse(this.incomeData.verifier);
    return this.incomeData.salt;
  }

  async auntUser(res: any) {
    const params = srpBigint.params['2048'];
    const secret2 = await srpBigint.genKey();
    this.s = new srpBigint.Server(
      params,
      Buffer.from(this.incomeData.verifier),
      secret2,
    );
    const srpB = this.s.computeB();
    const str = bufferJson.stringify({ buf: srpB });
    res.send(str);
  }

  aunthUserStepTwo(data: any, res: any) {
    if (data.sprA) {
      this.s.setA(Buffer.from(data.sprA.data));
    } else {
      this.s.setA(Buffer.from(this.incomeData.sprA.data));
    }
    this.s.checkM1(Buffer.from(data.m1));
    const key = this.s.computeK();
    this.encryptKey = bufferJson.stringify(key);
    res.send('done');
  }

  handleMessage(data: string, messageId: string) {
    this.messageController.saveMessage(data, messageId, this.dialogId);
  }

  encryptMessage(message: string) {
    const encrypted = aes256.encrypt(this.encryptKey, message);
    return encrypted;
  }

  decryptMessage(message: string) {
    const decrypted = aes256.decrypt(this.encryptKey, message);
    return decrypted;
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
