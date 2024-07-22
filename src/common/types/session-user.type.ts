import { UserRoleEnum } from '../enums/user-role.enum';

export type SessionUserType = {
  id: number;
  role: UserRoleEnum;
  login: string;
};
