import {
  createConnection,
  Connection,
  ConnectionOptions,
  getRepository,
  Repository,
} from 'typeorm';
import { join } from 'path';
import uniqid from 'uniqid';
import { Users } from './entity/Users.entity';
import { Message } from './entity/Message.entity';
import { Dialogs } from './entity/DialogUsers.entity';
import { RegisterData, Messages } from '../interfaces';

export class Database {
  connection: Promise<Connection>;

  constructor() {
    this.connection;
  }

  init() {
    const connectionOpts: ConnectionOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 54320,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    };

    this.connection = createConnection(connectionOpts);
  }

  async createNewUser(data: RegisterData) {
    const id = Math.floor(Math.random() * 100000);
    const { name, email, pass, userid } = data;
    const userRepo: Repository<Users> = getRepository(Users);
    const user: Users = userRepo.create({
      id,
      userid,
      name,
      email,
      pass,
    });

    await userRepo.save(user);
  }

  writeMessageToDatabase(data: Messages, dialogid: string) {
    const { message, userid } = data;
    const messageid: string = uniqid();
    const time: Date = new Date();

    this.addToMessageTable(time, userid, dialogid, messageid, message);
    this.addToDialogUseridTable(messageid, dialogid);
  }

  async addToMessageTable(
    time: Date,
    userid: string,
    dialogid: string,
    messageid: string,
    message: string,
    ) {
    const id = Math.floor(Math.random() * 100000);
    const messageRepo: Repository<Message> = getRepository(Message);
    const userMessage: Message = messageRepo.create({
      id,
      time,
      userid,
      dialogid,
      messageid,
      message,
    });

    await messageRepo.save(userMessage);
  }

  async addToDialogUseridTable(messageid: string, dialogid: string) {
    const id = Math.floor(Math.random() * 100000);
    const dialogRepo: Repository<Dialogs> = getRepository(Dialogs);
    const userDialog: Dialogs = dialogRepo.create({
      id,
      messageid,
      dialogid,
    });

    await dialogRepo.save(userDialog);
  }

}
