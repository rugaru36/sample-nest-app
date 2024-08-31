import { Inject, Injectable } from '@nestjs/common';
import { GetAllProfilesUseCase } from '../../application/use-cases/user-profile-admin/get-all-profiles.use-case';
import {
  GetAllUsersReqDtoInterface,
  GetAllUsersResDtoInterface,
} from '../dto-interfaces/user-profile-admin/get-all-users.dto-interface';

@Injectable()
export class UserProfileAdminService {
  @Inject(GetAllProfilesUseCase)
  private readonly getAllProfilesUseCase: GetAllProfilesUseCase;

  public async getAllProfiles(
    q: GetAllUsersReqDtoInterface,
  ): Promise<GetAllUsersResDtoInterface> {
    return await this.getAllProfilesUseCase.exec(q);
  }
}
