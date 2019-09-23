import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 30, unique: true })
  userid: string;

  @Column('varchar', { length: 30, nullable: true })
  name: string;

  @Column('varchar', { length: 30, nullable: true })
  email: string;

  @Column('varchar', { length: 30, nullable: true })
  pass: string;
}