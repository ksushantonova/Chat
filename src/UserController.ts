import Socket from './Socket';

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  userId: string;
}

export class UserController {
  tempUser: string;
  socket: Socket;

  init(data: string) {
    this.tempUser = data;
  }

  initUserSocket(userSocket: Socket) {
    this.socket = userSocket;
    this.socket.emit('initUser', this.tempUser);
  }
}
