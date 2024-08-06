import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../modules/user/domain/enums/user-role.enum';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
