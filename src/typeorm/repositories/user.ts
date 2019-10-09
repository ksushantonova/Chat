import { UserModel } from '../models/user.entity';
import { User } from '../../entities/user';
import { getConnection } from 'typeorm';
import { UserData } from '../../controllers/UserController';

export class TypeOrmUserRepository {
  public async add(user: UserData): Promise<User> {
    if (user.userId) {
      await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values(user)
      .execute();
    }
    return;
  }
}
