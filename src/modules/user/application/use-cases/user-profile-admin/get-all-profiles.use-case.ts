import { Inject, Injectable } from '@nestjs/common';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';
import {
  GetAllUsersReqDtoInterface,
  GetAllUsersResDtoInterface,
} from '../../../infrastructure/http/dto-interfaces/user-profile-admin/get-all-users.dto-interface';
import { UserService } from '../../../infrastructure/database/services/user.service';
import { getPaginationHelper } from '../../../../../common/helpers/pagination.helper';

@Injectable()
export class GetAllProfilesUseCase {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(UserProfileMapper)
  private readonly userProfileResolver: UserProfileMapper;

  public async exec(
    q: GetAllUsersReqDtoInterface,
  ): Promise<GetAllUsersResDtoInterface> {
    const { limit, page } = q;
    const result: GetAllUsersResDtoInterface = {
      users: this.userProfileResolver.list(
        await this.userService.getAll(getPaginationHelper(limit, page)),
      ),
    };
    if (q.withTotalCount) {
      result.totalCount = await this.userService.getCount();
    }
    return result;
  }
}
