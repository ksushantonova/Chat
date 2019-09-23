import { Messages } from '../interfaces';

export default class Socket {
  socket: any;
  io: any;
  database: any;
  dialogid: any;

  constructor(socket:any, io:any, database: any) {
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

  handler(data: any) {
    const receivedData: Messages = JSON.parse(data);
    const message: Messages = {
      message: receivedData.message,
      username: receivedData.username,
      userid: receivedData.userid,
    };
    this.io.emit('message', JSON.stringify(message));
    this.database.writeMessageToDatabase(message, this.dialogid);
  }

  callback() {
    console.log('user disconnected');
  }

  onMessage(dialogid: string, database: any) {
    this.dialogid = dialogid;
    this.on('message', this.handler);
  }

  disconnect() {
    this.on('disconnect', this.callback);
  }
}
