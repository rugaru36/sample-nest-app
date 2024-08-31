import { Injectable } from '@nestjs/common';
import { CommonMapperInterface } from '../../../../common/interfaces/common-mapper.interface';
import { UserShortDataInterface } from '../../domain/data-interfaces/user-short-data.interface';
import { UserInterface } from '../../domain/data-interfaces/user.interface';

@Injectable()
export class UserProfileMapper
  implements CommonMapperInterface<UserInterface, UserShortDataInterface>
{
  public single(user: UserInterface): UserShortDataInterface {
    return {
      id: user.id,
      is_verified: !!user.is_verified,
      login: user.login,
      email: user.email,
      last_login: user.last_login,
    };
  }

  public list(users: UserInterface[]): UserShortDataInterface[] {
    return users.map((u) => this.single(u));
  }
}
