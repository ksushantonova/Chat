import { TypeOrmUserRepository } from '../typeorm/repositories/user';

export interface UserData {
  name: string;
  email: string;
  password: string;
  userId: string;
}

export class UserController {
  saveUser(data: UserData) {
    const repository = new TypeOrmUserRepository();
    repository.add(data);
  }
}
