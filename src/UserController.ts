import Socket from './Socket';
import { TypeOrmUserRepository } from './typeorm/repositories/user';

export interface UserData {
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

  saveUser(data: UserData) {
    const repository = new TypeOrmUserRepository();
    repository.add(data);
  }
}
