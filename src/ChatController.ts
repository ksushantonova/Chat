import Database from './Database';
import uniqid from 'uniqid';

export class ChatController {

  socket: any;
  io: any;
  database: Database;
  tempUser: string;
  dialogid: string;
  userSocket: any;

  constructor(database: any) {
    this.database = database;
  }

  init(data: string) {
    this.tempUser = data;
    this.dialogid = null;
  }

  connect(socket: any, io: any, socketClass: any) {
    this.userSocket = new socketClass(socket, io);
    this.userSocket.emit(this.tempUser);
    if (!this.dialogid) {
      this.dialogid = uniqid();
    }
    this.userSocket.onMessage(this.dialogid, this.database);
    this.userSocket.disconnect();
  }

}
