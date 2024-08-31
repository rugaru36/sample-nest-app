import { Injectable, Scope } from '@nestjs/common';
import { UserCountQueryBuilderInterface } from '../../../application/interfaces/query-builders/user-count.query-builder.interface';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { CountOptions } from 'sequelize';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';

@Injectable({ scope: Scope.REQUEST })
export class UserCountQueryBuilder implements UserCountQueryBuilderInterface {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;
  private countOptions: CountOptions<UserInterface>;

  build(): UserCountQueryBuilderInterface {
    this.countOptions = {};
    return this;
  }

  async runCount(): Promise<number> {
    const count = await this.userModel.count(this.countOptions);
    this.countOptions = null;
    return count;
  }
}
