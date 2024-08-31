import { UserRoleEnum } from '../../../user/domain/enums/user-role.enum';

export type SessionUserType = {
  id: number;
  role: UserRoleEnum;
  login: string;
};
