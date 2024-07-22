import {
  Controller,
  ForbiddenException,
  Inject,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRoleEnum } from '../../../common/enums/user-role.enum';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { UserService } from '../services/user.service';
import { Get } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { GetAllUsersReqDto } from '../dto/get-all-users.dto';
import { GetAllUsersResInterface } from '../interfaces/get-all-users.interface';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersResDoc } from '../docs/get-all-users.doc';
import { GetOneUserResDoc } from '../docs/get-one-user.doc';
import { SessionUserType } from '../../../common/types/session-user.type';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';
import { Request } from 'express';

@ApiTags('all user methods')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(UserResolver)
  private readonly userResolver: UserResolver;

  @ApiTags('regular user methods')
  @ApiOkResponse({ type: GetOneUserResDoc })
  @UseGuards(AuthenticatedGuard)
  @Get('my-account')
  public async getMyAccount(
    @Req() req: Request,
  ): Promise<GetOneUserResInterface> {
    const userId = (req.user as SessionUserType)?.id || null;
    if (!userId) throw new ForbiddenException();
    return this.userResolver.resolveSingleUser(
      await this.userService.getMyProfile(userId || null),
    );
  }

  @ApiTags('admin user methods')
  @ApiOkResponse({ type: GetAllUsersResDoc })
  @UseGuards(AuthenticatedGuard)
  @Roles(UserRoleEnum.admin)
  @Get('all')
  public async getAllUsers(
    @Query() q: GetAllUsersReqDto,
  ): Promise<GetAllUsersResInterface> {
    const { limit, page } = q;
    const result: GetAllUsersResInterface = {
      users: this.userResolver.resolveList(
        await this.userService.getAllUsers(page, limit),
      ),
    };
    if (q.withTotalCount) {
      result.totalCount = await this.userService.getTotalCount();
    }
    return result;
  }
}
