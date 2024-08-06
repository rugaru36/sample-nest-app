import { Controller, Inject, Query, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { Roles } from '../../../../../common/decorators/role.decorator';
import { Get } from '@nestjs/common';
import { GetAllUsersResInterface } from '../interfaces/get-all-users.interface';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersResDoc } from '../docs/get-all-users.doc';
import { GetAllUsersReqDto } from './dto/get-all-users.dto';
import { UserProfileAdminService } from '../services/user-profile-admin.service';
import { AuthenticatedGuard } from '../../../../auth/infrastructure/http/guards/authenticated.guard';

@ApiTags('all user methods')
@Controller('user')
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
  ): Promise<GetAllUsersResInterface> {
    return await this.userProfileAdminService.getAllProfiles(q);
  }
}
