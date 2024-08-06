import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import {
  GetAllUsersReqInterface,
  GetAllUsersResInterface,
} from '../../infrastructure/http/interfaces/get-all-users.interface';
import { UserProfileResolver } from '../resolvers/user-profile.resolver';

@Injectable()
export class GetAllProfilesUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;
  @Inject(UserProfileResolver)
  private readonly userProfileResolver: UserProfileResolver;

  public async exec(
    q: GetAllUsersReqInterface,
  ): Promise<GetAllUsersResInterface> {
    const { limit, page } = q;
    const result: GetAllUsersResInterface = {
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
