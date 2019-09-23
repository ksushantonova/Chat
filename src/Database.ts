import {
  Connection,
  ConnectionOptions,
  Repository,
} from 'typeorm';
import { join } from 'path';
import uniqid from 'uniqid';
import { Users } from './entity/Users.entity';
import { Message } from './entity/Message.entity';
import { Dialogs } from './entity/DialogUsers.entity';
import { RegisterData, Messages } from '../interfaces';

export default class Database {
  connection: Promise<Connection>;
  createConnection: any;
  getRepository: any;
  userRepo: any;

  constructor(createConnection:any, getRepository: any) {
    this.connection;
    this.getRepository = getRepository;
    this.createConnection = createConnection;
    this.userRepo;
  }

  init() {
    const connectionOpts: ConnectionOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    };

    this.connection = this.createConnection(connectionOpts);
  }

  async createNewUser(data: RegisterData) {
    const id = Math.floor(Math.random() * 100000);
    const { name, email, pass, userid } = data;
    this.userRepo = this.getRepository(Users);
    const user: Users = this.userRepo.create({
      id,
      userid,
      name,
      email,
      pass,
    });

    await this.userRepo.save(user);
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
    const messageRepo: Repository<Message> = this.getRepository(Message);
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
    const dialogRepo: Repository<Dialogs> = this.getRepository(Dialogs);
    const userDialog: Dialogs = dialogRepo.create({
      id,
      messageid,
      dialogid,
    });

    await dialogRepo.save(userDialog);
  }

}
