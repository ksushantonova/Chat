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

// {
//    "type": "postgres",
//    "host": "localhost",
//    "port": 5432,
//    "username": "ksu",
//    "password": "aaa",
//    "database": "chat",
//    "synchronize": true,
//    "logging": false,
//    "entities": [
//       "src/entity/**/*.entity.ts"
//    ],
//    "migrations": [
//       "src/migration/**/*.ts"
//    ],
//    "subscribers": [
//       "src/subscriber/**/*.ts"
//    ],
//    "cli": {
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration",
//       "subscribersDir": "src/subscriber"
//    }
// }
