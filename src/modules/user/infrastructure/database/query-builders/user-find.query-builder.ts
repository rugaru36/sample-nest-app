import { Injectable, Scope } from '@nestjs/common';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';
import { FindOptions, WhereOptions } from 'sequelize';
import { UserModel } from '../models/user.model';
import { UserFindQueryBuilderInterface } from '../../../application/interfaces/query-builders/user-find.query-builder.interface';
import { FindQueryBuildernterface } from '../../../../../common/interfaces/query-builder.interface';
import { getPaginationHelper } from '../../../../../common/helpers/pagination.helper';
import { isEmailHelper } from '../../../../../common/helpers/is-email.helper';
import { InjectModel } from '@nestjs/sequelize';

@Injectable({ scope: Scope.REQUEST })
export class UserFindQueryBuilder implements UserFindQueryBuilderInterface {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;
  private findOptions: FindOptions<UserInterface> = null;

  paginate(
    page: number,
    limit: number,
  ): FindQueryBuildernterface<UserInterface> {
    Object.assign(this.findOptions || {}, getPaginationHelper(limit, page));
    return this;
  }

  public build(): UserFindQueryBuilderInterface {
    this.findOptions = {};
    return this;
  }

  public async runFindAll(): Promise<UserInterface[]> {
    if (this.findOptions == null) {
      throw new Error('query is not built');
    }
    const result = await this.userModel.findAll(this.findOptions);
    this.findOptions = null;
    return result;
  }

  public async runFindOne(): Promise<UserInterface> {
    if (this.findOptions == null) {
      throw new Error('query is not built');
    }
    const result = await this.userModel.findOne(this.findOptions);
    this.findOptions = null;
    return result;
  }

  byLoginOrEmail(loginOrEmail: string): UserFindQueryBuilderInterface {
    const options: WhereOptions<UserInterface> = isEmailHelper(loginOrEmail)
      ? { email: loginOrEmail }
      : { login: loginOrEmail };
    Object.assign<WhereOptions<UserInterface>, WhereOptions<UserInterface>>(
      this.findOptions?.where || {},
      options,
    );
    return this;
  }

  byId(id: number): UserFindQueryBuilderInterface {
    const where: WhereOptions<UserInterface> = { id };
    Object.assign(this.findOptions?.where || {}, where);
    return this;
  }

  byEmail(email: string): UserFindQueryBuilderInterface {
    const where: WhereOptions<UserInterface> = { email };
    Object.assign(this.findOptions?.where || {}, where);
    return this;
  }
}
