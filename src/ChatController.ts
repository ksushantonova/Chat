import uniqid from 'uniqid';
import Database from './Database';
import { UserSocket } from '../interfaces';
import Socket from './Socket';

export class ChatController {
  socket: UserSocket;
  io: any;
  database: Database;
  tempUser: string;
  dialogid: string;
  userSocket: Socket;

  constructor(database: Database) {
    this.database = database;
  }

  init(data: string) {
    this.tempUser = data;
    this.dialogid = null;
  }

  connect(socket: UserSocket, io: any, socketClass: any) {
    this.userSocket = new socketClass(socket, io, this.database);
    this.userSocket.emit(this.tempUser);
    if (!this.dialogid) {
      this.dialogid = uniqid();
    }
    this.userSocket.onMessage(this.dialogid);
    this.userSocket.disconnect();
  }
}
