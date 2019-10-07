import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryColumn('varchar', { length: 30, unique: true, name: 'user_id' })
  userId: string;

  @Column('varchar', { length: 30, nullable: true})
  name: string;

  @Column('varchar', { length: 30, nullable: true })
  email: string;

  @Column('varchar', { length: 30, nullable: true })
  password: string;
}
