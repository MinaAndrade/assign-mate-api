import { User } from '@prisma/client';

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
}