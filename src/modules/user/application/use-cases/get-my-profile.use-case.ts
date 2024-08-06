import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { UserProfileEntityInterface } from '../../domain/entity-interfaces/user-profile.entity-interface';
import { UserProfileResolver } from '../resolvers/user-profile.resolver';

@Injectable()
export class GetMyProfileUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;
  @Inject(UserProfileResolver)
  private readonly userProfileResolver: UserProfileResolver;

  public async exec(userId: number): Promise<UserProfileEntityInterface> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new NotFoundException();
    return this.userProfileResolver.single(user);
  }
}
