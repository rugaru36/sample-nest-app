import { Controller, Inject, Query, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersResDoc } from '../docs/user-profile-admin/get-all-users.doc';
import { GetAllUsersReqDto } from '../dto/user-profile-admin/get-all-users.dto';
import { UserProfileAdminService } from '../services/user-profile-admin.service';
import { AuthenticatedGuard } from '../../../auth/presentation/guards/authenticated.guard';
import { Roles } from '../../../auth/presentation/decorators/role.decorator';
import { GetAllUsersResDtoInterface } from '../dto-interfaces/user-profile-admin/get-all-users.dto-interface';

@ApiTags('all user methods')
@Controller('user/admin')
export class UserProfileAdminController {
  @Inject(UserProfileAdminService)
  private readonly userProfileAdminService: UserProfileAdminService;

  @ApiTags('admin user methods')
  @ApiOkResponse({ type: GetAllUsersResDoc })
  @UseGuards(AuthenticatedGuard)
  @Roles(UserRoleEnum.admin)
  @Get('all')
  public async getAllUsers(
    @Query() q: GetAllUsersReqDto,
  ): Promise<GetAllUsersResDtoInterface> {
    return await this.userProfileAdminService.getAllProfiles(q);
  }
}
