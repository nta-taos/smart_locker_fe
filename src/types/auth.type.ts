import { UserType } from './user.type';

export type AuthType = {
  isAuthenticated: boolean;
  token: string | null;
  user: UserType | null;
};
