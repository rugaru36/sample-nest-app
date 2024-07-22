import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../common/model-modules/user/models/user.model';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';

@Injectable()
export class UserResolver {
  public resolveSingleUser(user: UserModel): GetOneUserResInterface {
    return {
      id: user.id,
      is_verified: !!user.is_verified,
      login: user.login,
      email: user.email,
      last_login: user.last_login,
    };
  }

  public resolveList(users: UserModel[]): GetOneUserResInterface[] {
    return users.map((u) => this.resolveSingleUser(u));
  }
}
