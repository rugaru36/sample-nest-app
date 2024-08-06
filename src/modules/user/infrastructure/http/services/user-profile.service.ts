import { Inject, Injectable } from '@nestjs/common';
import { UserProfileEntityInterface } from '../../../domain/entity-interfaces/user-profile.entity-interface';
import { GetMyProfileUseCase } from '../../../application/use-cases/user-profile/get-my-profile.use-case';

@Injectable()
export class UserProfileService {
  @Inject(GetMyProfileUseCase)
  private readonly getMyProfileUseCase: GetMyProfileUseCase;

  public async getMyProfile(
    userId: number,
  ): Promise<UserProfileEntityInterface> {
    return await this.getMyProfileUseCase.exec(userId);
  }
}
