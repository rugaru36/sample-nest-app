import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserInterface {
  id: number;
  password: string;
  login: string | null;
  email: string | null;
  role: UserRoleEnum;
  is_verified: boolean;
  password_salt: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
}
