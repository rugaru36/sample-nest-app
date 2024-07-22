import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../../../common/model-modules/user/models/user.model';
import { UserModelService } from '../../../common/model-modules/user/services/user.model-service';
import { isEmailHelper } from '../../../common/helpers/is-email.helper';
import { hashPasswordHelper } from '../../../common/helpers/hash-password.helper';
import { SignUpReqDtoInterface } from '../interfaces/sign-up.req-interface';

@Injectable()
export class AuthService {
  @Inject(UserModelService)
  private readonly userModelService: UserModelService;

  public async singUp(data: SignUpReqDtoInterface): Promise<void> {
    await this.userModelService.createUser(data);
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserModel> {
    const isEmail = isEmailHelper(username);
    const user = isEmail
      ? await this.userModelService.getByEmail(username)
      : await this.userModelService.getByLogin(username);
    if (!user) return null;
    const hashedPassword = hashPasswordHelper(password, user.password_salt);
    if (hashedPassword == user.password) {
      await this.userModelService.updateLastLogin(user.id);
      return user;
    }
    return null;
  }
}
