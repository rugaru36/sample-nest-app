import { Inject, Injectable } from '@nestjs/common';
import { RegistrateReqDtoInterface } from '../../../../auth/presentation/dto-interfaces/sign-up.dto-interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { UserCreateQueryBuilder } from '../../../infrastructure/database/query-builders/user-create.query-builder';
import { UserCreateQueryBuilderInterface } from '../../interfaces/query-builders/user-create.query-builder.interface';
import { UserPasswordService } from '../../services/user-password.service';

@Injectable()
export class RegistrateUseCase {
  @Inject(UserPasswordService)
  private readonly passwordService: UserPasswordService;
  @Inject(UserCreateQueryBuilder)
  private readonly userCreateQueryBuilder: UserCreateQueryBuilderInterface;

  public async exec(data: RegistrateReqDtoInterface): Promise<void> {
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
