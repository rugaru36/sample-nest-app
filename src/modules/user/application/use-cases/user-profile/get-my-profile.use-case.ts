import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileEntityInterface } from '../../../domain/entity-interfaces/user-profile.entity-interface';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';
import { UserService } from '../../../infrastructure/database/services/user.service';

@Injectable()
export class GetMyProfileUseCase {
  @Inject(UserService)
  private readonly userRepository: UserService;
  @Inject(UserProfileMapper)
  private readonly userProfileResolver: UserProfileMapper;

  public async exec(userId: number): Promise<UserProfileEntityInterface> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new NotFoundException();
    return this.userProfileResolver.single(user);
  }
}
