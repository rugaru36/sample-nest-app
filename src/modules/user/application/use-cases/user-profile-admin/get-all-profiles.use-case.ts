import { Inject, Injectable } from '@nestjs/common';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';
import {
  GetAllUsersReqDtoInterface,
  GetAllUsersResDtoInterface,
} from '../../../presentation/dto-interfaces/user-profile-admin/get-all-users.dto-interface';
import { UserCountQueryBuilder } from '../../../infrastructure/database/query-builders/user-count.query-builder';
import { UserFindQueryBuilder } from '../../../infrastructure/database/query-builders/user-find.query-builder';

@Injectable()
export class GetAllProfilesUseCase {
  @Inject(UserCountQueryBuilder)
  private readonly userCountQueryBuilder: UserCountQueryBuilder;
  @Inject(UserFindQueryBuilder)
  private readonly userFindQueryBuilder: UserFindQueryBuilder;
  @Inject(UserProfileMapper)
  private readonly userProfileResolver: UserProfileMapper;

  public async exec(
    q: GetAllUsersReqDtoInterface,
  ): Promise<GetAllUsersResDtoInterface> {
    const { limit, page } = q;
    const allUsers = await this.userFindQueryBuilder
      .build()
      .paginate(page, limit)
      .runFindAll();
    const result: GetAllUsersResDtoInterface = {
      users: this.userProfileResolver.list(allUsers),
    };
    if (q.withTotalCount) {
      result.totalCount = await this.userCountQueryBuilder.build().runCount();
    }
    return result;
  }
}
