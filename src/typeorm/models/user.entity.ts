import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { User } from '../../entities/user';

@Entity({ name: 'users' })
export class UserModel extends BaseEntity implements User {
  @PrimaryColumn('varchar', { length: 30, unique: true, name: 'user_id' })
  userId: string;

  @Column('varchar', { length: 30, nullable: true })
  name: string;

  @Column('varchar', { length: 30, nullable: true })
  email: string;

  @Column('varchar', { length: 30, nullable: true })
  password: string;
}
