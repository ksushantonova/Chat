import { BaseEntity } from 'typeorm';

export interface User extends BaseEntity {
  userId: string;
  name: string;
  identity: string;
  salt: string;
  verifier: string;
}
