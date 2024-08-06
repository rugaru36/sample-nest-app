import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import {
  GetAllUsersReqDtoInterface,
  GetAllUsersResDtoInterface,
} from '../../infrastructure/http/dto-interfaces/get-all-users.dto-interface';
import { UserProfileResolver } from '../resolvers/user-profile.resolver';

@Injectable()
export class GetAllProfilesUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;
  @Inject(UserProfileResolver)
  private readonly userProfileResolver: UserProfileResolver;

  public async exec(
    q: GetAllUsersReqDtoInterface,
  ): Promise<GetAllUsersResDtoInterface> {
    const { limit, page } = q;
    const result: GetAllUsersResDtoInterface = {
      users: this.userProfileResolver.list(
        await this.userRepository.getAllUsers({ page, limit }),
      ),
    };
    if (q.withTotalCount) {
      result.totalCount = await this.userRepository.getCount();
    }
    return result;
  }
}
