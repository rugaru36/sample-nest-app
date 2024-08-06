import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/infrastructure/database/services/user.service';
import { UserModel } from '../../../user/infrastructure/database/models/user.model';

@Injectable()
export class SignInUseCase {
  @Inject(UserService)
  private readonly userService: UserService;

  public async exec(
    loginOrEmail: string,
    password: string,
  ): Promise<UserModel> {
    const validUser = await this.userService.checkPassword(
      loginOrEmail,
      password,
    );
    if (!validUser) {
      throw new ForbiddenException();
    }
    await this.userService.updateLastLogin(validUser.id);
    return validUser;
  }
}
