import { Injectable } from '@nestjs/common';
import { GetOneUserResDtoInterface } from '../../infrastructure/http/dto-interfaces/user-profile/get-one-user.dto-interface';
import { UserModel } from '../../infrastructure/database/models/user.model';
import { CommonResolverInterface } from '../../../../common/interfaces/common-resolver.interface';
import { UserProfileEntityInterface } from '../../domain/entity-interfaces/user-profile.entity-interface';

@Injectable()
export class UserProfileResolver
  implements CommonResolverInterface<UserModel, UserProfileEntityInterface>
{
  public single(user: UserModel): GetOneUserResDtoInterface {
    return {
      id: user.id,
      is_verified: !!user.is_verified,
      login: user.login,
      email: user.email,
      last_login: user.last_login,
    };
  }

  public list(users: UserModel[]): GetOneUserResDtoInterface[] {
    return users.map((u) => this.single(u));
  }
}
