import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Message extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  time: Date;

  @Column('varchar', { length: 30 })
  userid: string;

  @Column('varchar', { length: 30 })
  dialogid: string;

  @Column('varchar', { length: 30 })
  messageid: string;

  @Column('varchar', { length: 500 })
  message: string;
}
