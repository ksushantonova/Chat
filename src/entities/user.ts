import { BaseEntity } from 'typeorm';

export interface User extends BaseEntity {
  userId: string;
  name: string;
  email: string;
  password: string;
}
