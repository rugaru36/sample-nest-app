import {
  Controller,
  ForbiddenException,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionUserType } from '../../../../auth/infrastructure/http/types/session-user.type';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';
import { Request } from 'express';
import { GetOneUserResDoc } from '../docs/get-one-user.doc';
import { UserProfileService } from '../services/user-profile.service';
import { AuthenticatedGuard } from '../../../../auth/infrastructure/http/guards/authenticated.guard';

@ApiTags('all user methods')
@Controller('user')
export class UserProfileController {
  @Inject(UserProfileService)
  private readonly userProfileService: UserProfileService;

  @ApiTags('regular user methods')
  @ApiOkResponse({ type: GetOneUserResDoc })
  @UseGuards(AuthenticatedGuard)
  @Get('my-account')
  public async getMyAccount(
    @Req() req: Request,
  ): Promise<GetOneUserResInterface> {
    const userId = (req.user as SessionUserType)?.id || null;
    if (!userId) throw new ForbiddenException();
    return await this.userProfileService.getMyProfile(userId);
  }
}
