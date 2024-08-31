import { Inject, Injectable } from '@nestjs/common';
import { UserShortDataInterface } from '../../domain/data-interfaces/user-short-data.interface';
import { GetMyProfileUseCase } from '../../application/use-cases/user-profile/get-my-profile.use-case';
import { RegistrateReqDtoInterface } from '../../../auth/presentation/dto-interfaces/sign-up.dto-interface';
import { RegistrateUseCase } from '../../application/use-cases/user-profile/user-registrate.use-case';

@Injectable()
export class UserProfileService {
  @Inject(GetMyProfileUseCase)
  private readonly getMyProfileUseCase: GetMyProfileUseCase;
  @Inject(RegistrateUseCase)
  private readonly registrateUseCase: RegistrateUseCase;

  public async getMyProfile(userId: number): Promise<UserShortDataInterface> {
    return await this.getMyProfileUseCase.exec(userId);
  }

  public async register(data: RegistrateReqDtoInterface): Promise<void> {
    await this.registrateUseCase.exec(data);
  }
}
