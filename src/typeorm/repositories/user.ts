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

  public async find(identity: string): Promise<User> {
    if (identity) {
      const result = await getConnection()
      .createQueryBuilder()
      .select('users')
      .from(UserModel, 'users')
      .where('users.identity = :identity', { identity })
      .getOne();
      return result;
    }
  }
}
