import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserShortDataInterface } from '../../../domain/data-interfaces/user-short-data.interface';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';
import { UserFindQueryBuilder } from '../../../infrastructure/database/query-builders/user-find.query-builder';

@Injectable()
export class GetMyProfileUseCase {
  @Inject(UserFindQueryBuilder)
  private readonly userFindQueryBuilder: UserFindQueryBuilder;
  @Inject(UserProfileMapper)
  private readonly userProfileMapper: UserProfileMapper;

  public async exec(userId: number): Promise<UserShortDataInterface> {
    const user = await this.userFindQueryBuilder
      .build()
      .byId(userId)
      .runFindOne();
    if (!user) throw new NotFoundException();
    return this.userProfileMapper.single(user);
  }
}
