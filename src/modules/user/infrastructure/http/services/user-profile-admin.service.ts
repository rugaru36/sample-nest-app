import { Inject, Injectable } from '@nestjs/common';
import { GetAllProfilesUseCase } from '../../../application/use-cases/get-all-profiles.use-case';
import {
  GetAllUsersReqInterface,
  GetAllUsersResInterface,
} from '../interfaces/get-all-users.interface';

@Injectable()
export class UserProfileAdminService {
  @Inject(GetAllProfilesUseCase)
  private readonly getAllProfilesUseCase: GetAllProfilesUseCase;

  public async getAllProfiles(
    q: GetAllUsersReqInterface,
  ): Promise<GetAllUsersResInterface> {
    return await this.getAllProfilesUseCase.exec(q);
  }
}
