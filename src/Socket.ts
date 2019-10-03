import { Messages, UserSocket } from '../interfaces';
import Database from './Database';
import socketIo from 'socket.io';

export default class Socket {
  socket: UserSocket;
  io: any;
  database: Database;
  dialogid: string;

  constructor(socket: UserSocket, io: any, database: Database) {
    this.database = database;
    this.socket = socket;
    this.io = io;
    this.dialogid;
  }

  emit(tempUser: string) {
    this.socket.emit('initUser', tempUser);
  }

  on(topic: string, handler: any) {
    this.socket.on(topic, handler);
  }

  onMessage(dialogid: string) {
    this.dialogid = dialogid;
    this.on('message', (data: string) => {
      const receivedData: Messages = JSON.parse(data);
      const message: Messages = {
        message: receivedData.message,
        username: receivedData.username,
        userid: receivedData.userid,
      };
      this.io.emit('message', JSON.stringify(message));
      this.database.writeMessageToDatabase(message, this.dialogid);
    });
  }

  disconnect() {
    this.on('disconnect', this.callback);
  }

  callback() {
    console.log('user disconnected');
  }
}
