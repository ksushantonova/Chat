import Socket from './Socket';
import { Users } from './entity/Users.entity';

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  userId: string;
}

export class UserController {
  tempUser: string;
  socket: Socket;
  getRepository: any;

  constructor(getRepository: any) {
    this.getRepository = getRepository;
  }

  init(data: string) {
    this.tempUser = data;
  }

  connect(userSocket: Socket) {
    this.socket = userSocket;
    this.socket.emit('initUser', this.tempUser);
  }

  async addToTable(data: UserData) {
    const repo = this.getRepository(Users);
    const result = repo.create(data);
    await repo.save(result);
  }
}
