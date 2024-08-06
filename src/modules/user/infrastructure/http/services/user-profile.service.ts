import { Inject, Injectable } from '@nestjs/common';
import { GetAllProfilesUseCase } from '../../../application/use-cases/get-all-profiles.use-case';
import { GetMyProfileUseCase } from '../../../application/use-cases/get-my-profile.use-case';
import { UserProfileEntityInterface } from '../../../domain/entity-interfaces/user-profile.entity-interface';

@Injectable()
export class UserProfileService {
  @Inject(GetMyProfileUseCase)
  private readonly getMyProfileUseCase: GetMyProfileUseCase;
  @Inject(GetAllProfilesUseCase)
  private readonly getAllProfilesUseCase: GetAllProfilesUseCase;

  public async getMyProfile(
    userId: number,
  ): Promise<UserProfileEntityInterface> {
    return await this.getMyProfileUseCase.exec(userId);
  }
}
