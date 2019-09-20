import { Messages } from '../interfaces';
import { Database } from './Database';
import uniqid from 'uniqid';

export class ChatController {

  socket: any;
  io: any;
  database: Database;
  tempUser: string;
  dialogid: string;

  init(data: string, database: any) {
    this.tempUser = data;
    this.database = database;
    this.dialogid = null;
  }

  connect(socket: any, io: any) {

    this.socket = socket;
    this.io = io;
    this.socket.emit('initUser', this.tempUser);
    if (!this.dialogid) {
      this.dialogid = uniqid();
    }

    this.socket.on('message', (data: string) => {
      const receivedData: Messages = JSON.parse(data);
      const message: Messages = {
        message: receivedData.message,
        username: receivedData.username,
        userid: receivedData.userid,
      };
      this.io.emit('message', JSON.stringify(message));
      this.database.writeMessageToDatabase(message, this.dialogid);
    });

    this.socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }

}
