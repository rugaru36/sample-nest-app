import { Inject, Injectable } from '@nestjs/common';
import { SignUpReqDtoInterface } from '../../presentation/dto-interfaces/sign-up.dto-interface';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';
import { UserRoleEnum } from '../../../user/domain/enums/user-role.enum';
import { UserPasswordService } from '../../../user/application/services/user-password.service';
import { UserCreateQueryBuilder } from '../../../user/infrastructure/database/query-builders/user-create.query-builder';
import { UserCreateQueryBuilderInterface } from '../../../user/application/interfaces/query-builders/user-create.query-builder.interface';

@Injectable()
export class SignUpUseCase {
  @Inject(UserPasswordService)
  private readonly passwordService: UserPasswordService;
  @Inject(UserCreateQueryBuilder)
  private readonly userCreateQueryBuilder: UserCreateQueryBuilderInterface;

  public async exec(data: SignUpReqDtoInterface): Promise<void> {
    const user: Partial<UserInterface> = data;
    user.password_salt = this.passwordService.generateSalt();
    user.password = this.passwordService.generatePasswordHash(
      user.password,
      user.password_salt,
    );
    user.role = UserRoleEnum.user;
    await this.userCreateQueryBuilder.runCreate(user);
  }
}
