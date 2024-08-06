import { Injectable } from '@nestjs/common';
import { GetOneUserResDtoInterface } from '../../infrastructure/http/dto-interfaces/get-one-user.dto-interface';
import { UserModel } from '../../infrastructure/database/models/user.model';

@Injectable()
export class UserProfileResolver {
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
