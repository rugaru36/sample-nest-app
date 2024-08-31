import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserFindQueryBuilder } from '../../../user/infrastructure/database/query-builders/user-find.query-builder';
import { UserPasswordService } from '../../../user/application/services/user-password.service';
import { UserUpdateQueryBuilder } from '../../../user/infrastructure/database/query-builders/user-update.query-builder';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';

@Injectable()
export class SignInUseCase {
  @Inject(UserFindQueryBuilder)
  private readonly userFindQueryBuilder: UserFindQueryBuilder;
  @Inject(UserUpdateQueryBuilder)
  private readonly userUpdateQueryBuilder: UserUpdateQueryBuilder;
  @Inject(UserPasswordService)
  private readonly userPasswordService: UserPasswordService;

  public async exec(
    loginOrEmail: string,
    password: string,
  ): Promise<UserInterface> {
    const validUser = await this.userFindQueryBuilder
      .build()
      .byLoginOrEmail(loginOrEmail)
      .runFindOne();
    if (!validUser) throw new NotFoundException();
    const isValidPassword =
      await this.userPasswordService.compareRawPasswordWithHash(
        validUser.password,
        password,
        validUser.password_salt,
      );
    if (!isValidPassword) throw new ForbiddenException();
    await this.userUpdateQueryBuilder
      .byId(validUser.id)
      .runUpdate({ last_login: new Date() });
    return validUser;
  }
}
