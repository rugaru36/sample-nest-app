import { Inject, Injectable } from '@nestjs/common';
import { UserShortDataInterface } from '../../domain/data-interfaces/user-short-data.interface';
import { GetMyProfileUseCase } from '../../application/use-cases/user-profile/get-my-profile.use-case';

@Injectable()
export class UserProfileService {
  @Inject(GetMyProfileUseCase)
  private readonly getMyProfileUseCase: GetMyProfileUseCase;

  public async getMyProfile(userId: number): Promise<UserShortDataInterface> {
    return await this.getMyProfileUseCase.exec(userId);
  }
}
