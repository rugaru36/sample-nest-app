import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { hashPasswordHelper } from '../../../helpers/hash-password.helper';
import { CountOptions, FindOptions, Transaction } from 'sequelize';
import { saltGeneratorHelper } from '../../../helpers/salt-generator.helper';
import { UserRoleEnum } from '../../../enums/user-role.enum';

@Injectable()
export class UserModelService {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  // --------------------- insert ---------------------

  public async createUser(
    data: Partial<UserModel>,
    transaction?: Transaction,
  ): Promise<UserModel> {
    if (!data.password?.length) throw new Error(`no password provided!`);
    data.password_salt = saltGeneratorHelper();
    data.password = hashPasswordHelper(data.password, data.password_salt);
    data.role = data.role || UserRoleEnum.user;
    return await this.userModel.create(data, { transaction });
  }

  // --------------------- select ---------------------

  public async getById(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id);
  }

  public async getAll(
    findOptions?: FindOptions<UserModel>,
  ): Promise<UserModel[]> {
    return await this.userModel.findAll(findOptions);
  }

  public async getAllCount(
    countOptions?: CountOptions<UserModel>,
  ): Promise<number> {
    return await this.userModel.count(countOptions);
  }

  public async getByEmail(email: string): Promise<UserModel> {
    return await this.userModel.findOne({ where: { email } });
  }

  public async getByLogin(login: string): Promise<UserModel> {
    return await this.userModel.findOne({ where: { login } });
  }

  // --------------------- update ---------------------

  public async updateLastLogin(
    userId: number,
    transaction: Transaction = null,
  ): Promise<void> {
    await this.userModel.update(
      { last_login: new Date() },
      { where: { id: userId }, transaction },
    );
  }
}
