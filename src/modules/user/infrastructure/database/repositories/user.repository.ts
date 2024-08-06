import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CountOptions, FindOptions, Transaction } from 'sequelize';
import { PasswordService } from '../../../application/services/password.service';

@Injectable()
export class UserRepository {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;
  @Inject(PasswordService)
  private readonly passwordService: PasswordService;

  public async createUser(
    data: Partial<UserModel>,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return await this.userModel.create(data, { transaction });
  }

  public async updateUser(
    data: Partial<UserModel>,
    userId: number,
    transaction: Transaction = null,
  ): Promise<void> {
    await this.userModel.update(data, { where: { id: userId }, transaction });
  }

  public async getById(
    id: number,
    findOptions?: FindOptions<UserModel>,
  ): Promise<UserModel> {
    const user = await this.userModel.findByPk(id, findOptions);
    return user;
  }

  public async getAllUsers(
    findOptions?: FindOptions & { page: number },
  ): Promise<UserModel[]> {
    if (findOptions.page)
      findOptions.offset = (findOptions.page - 1) * findOptions.limit;
    return await this.userModel.findAll(findOptions);
  }

  public async getOne(findOptions: FindOptions<UserModel>): Promise<UserModel> {
    return (await this.userModel.findOne(findOptions)) || null;
  }

  public async getCount(options?: CountOptions<UserModel>): Promise<number> {
    return await this.userModel.count(options);
  }
}
