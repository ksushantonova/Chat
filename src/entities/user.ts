import { BaseEntity } from 'typeorm';

export interface User extends BaseEntity {
  id: string;
  name: string;
  identity: string;
  salt: string;
  verifier: string;
}
