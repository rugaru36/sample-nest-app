import { Injectable } from '@nestjs/common';
import { GetOneUserResInterface } from '../../infrastructure/http/interfaces/get-one-user.interface';
import { UserModel } from '../../infrastructure/database/models/user.model';

@Injectable()
export class UserProfileResolver {
  public single(user: UserModel): GetOneUserResInterface {
    return {
      id: user.id,
      is_verified: !!user.is_verified,
      login: user.login,
      email: user.email,
      last_login: user.last_login,
    };
  }

  public list(users: UserModel[]): GetOneUserResInterface[] {
    return users.map((u) => this.single(u));
  }
}
