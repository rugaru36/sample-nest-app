import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserModelService } from '../../../common/model-modules/user/services/user.model-service';
import { UserModel } from '../../../common/model-modules/user/models/user.model';

@Injectable()
export class UserService {
  @Inject(UserModelService)
  private readonly userModelService: UserModelService;

  public async getMyProfile(id: number): Promise<UserModel> {
    const user = await this.userModelService.getById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  public async getAllUsers(page: number, limit: number): Promise<UserModel[]> {
    return await this.userModelService.getAll({
      limit,
      offset: (page - 1) * limit,
    });
  }

  public async getTotalCount(): Promise<number> {
    return await this.userModelService.getAllCount();
  }
}
