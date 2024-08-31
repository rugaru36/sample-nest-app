import { Injectable, Scope } from '@nestjs/common';
import { UserCreateQueryBuilderInterface } from '../../../application/interfaces/query-builders/user-create.query-builder.interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable({ scope: Scope.REQUEST })
export class UserCreateQueryBuilder implements UserCreateQueryBuilderInterface {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  async runCreate(data: Partial<UserInterface>): Promise<UserInterface> {
    return await this.userModel.create(data);
  }
}
