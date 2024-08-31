import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { Transaction } from 'sequelize';
import { PasswordService } from '../../../application/services/password.service';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { isEmailHelper } from '../../../../../common/helpers/is-email.helper';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  @Inject(PasswordService)
  private readonly passwordService: PasswordService;
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  public async getById(id: number): Promise<UserModel> {
    return await this.userModel.findByPk(id);
  }

  public async createUser(
    data: Partial<UserModel>,
    transaction?: Transaction,
  ): Promise<UserModel> {
    if (!data.password?.length) throw new Error(`no password provided!`);
    data.password_salt = this.passwordService.generateSalt();
    data.password = this.passwordService.generatePasswordHash(
      data.password,
      data.password_salt,
    );
    data.role = data.role || UserRoleEnum.user;
    return await this.userModel.create(data, { transaction });
  }

  public async checkPassword(
    login: string,
    password: string,
  ): Promise<UserModel> {
    const user = await this.userModel.findOne({
      where: {
        [isEmailHelper(login) ? 'login' : 'email']: login,
      },
    });
    if (!user) return null;
    const isValidPassword =
      await this.passwordService.compareRawPasswordWithHash(
        user.password,
        password,
        user.password_salt,
      );
    if (!isValidPassword) return null;
    return user;
  }

  public async updateLastLogin(id: number): Promise<UserModel> {
    const user = await this.userModel.findByPk(id);
    return await user.update({ last_login: new Date() });
  }
}
