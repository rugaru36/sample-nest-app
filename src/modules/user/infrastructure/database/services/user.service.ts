import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { CountOptions, FindOptions, Transaction } from 'sequelize';
import { UserPasswordService } from '../../../application/services/user-password.service';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { isEmailHelper } from '../../../../../common/helpers/is-email.helper';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  @Inject(UserPasswordService)
  private readonly passwordService: UserPasswordService;
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  public async getById(
    id: number,
    findOptions: FindOptions<UserModel> = {},
  ): Promise<UserModel> {
    return await this.userModel.findByPk(id, findOptions);
  }

  public async getCount(
    countOptions: CountOptions<UserModel> = {},
  ): Promise<number> {
    return await this.userModel.count(countOptions);
  }

  public async getAll(
    findOptions: FindOptions<UserModel> = {},
  ): Promise<UserModel[]> {
    return await this.userModel.findAll(findOptions);
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
