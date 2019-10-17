import { getConnection } from 'typeorm';
import { UserModel } from '../models/user.entity';
import { User } from '../../entities/user';

export class TypeOrmUserRepository {
  public async add(user: User): Promise<User> {
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