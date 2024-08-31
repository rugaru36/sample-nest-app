import { Injectable, Scope } from '@nestjs/common';
import { UserUpdateQueryBuilderInterface } from '../../../application/interfaces/query-builders/user-update.query-builder.interface';
import { UpdateQueryBuilderInterface } from '../../../../../common/interfaces/query-builder.interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UpdateOptions } from 'sequelize';

@Injectable({ scope: Scope.REQUEST })
export class UserUpdateQueryBuilder implements UserUpdateQueryBuilderInterface {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;
  private updateOptions: UpdateOptions;

  async runUpdate(data: Partial<UserInterface>): Promise<UserInterface[]> {
    const updateResult = await this.userModel.update(
      data,
      this.updateOptions as any,
    );
    return updateResult[1];
  }

  silent(): UserUpdateQueryBuilder {
    this.updateOptions.silent = true;
    return this;
  }

  byId(id: number): UserUpdateQueryBuilderInterface {
    this.updateOptions.where = { id };
    return this;
  }

  build(): UpdateQueryBuilderInterface<UserInterface> {
    this.updateOptions = { where: {} };
    return this;
  }
}
