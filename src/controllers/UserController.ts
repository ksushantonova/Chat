import { TypeOrmUserRepository } from '../typeorm/repositories/user';
import bufferJson from 'buffer-json';

export interface UserData {
  name: string;
  identity: any;
  salt: any;
  userId: string;
  requestName: string;
  verifier: any;
}

export class UserController {
  repository: TypeOrmUserRepository;

  saveUser(data: UserData) {
    this.repository = new TypeOrmUserRepository();
    this.repository.add(data);
  }

  async getUser(identity: string) {
    if (!this.repository) {
      this.repository = new TypeOrmUserRepository();
    }
    const query = bufferJson.stringify(identity);
    const result = await this.repository.find(query);
    return result;
  }
}
