import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionUserType } from '../../../auth/presentation/types/session-user.type';
import { GetOneUserResDtoInterface } from '../dto-interfaces/user-profile/get-one-user.dto-interface';
import { Request } from 'express';
import { GetOneUserResDoc } from '../docs/user-profile/get-one-user.doc';
import { UserProfileService } from '../services/user-profile.service';
import { AuthenticatedGuard } from '../../../auth/presentation/guards/authenticated.guard';
import { RegistrateReqDoc } from '../../../auth/presentation/docs/sign-up.doc';
import { RegistrateReqDto } from '../../../auth/presentation/dto/sign-up.dto';

@ApiTags('all user methods')
@Controller('user')
export class UserProfileController {
  @Inject(UserProfileService)
  private readonly userProfileService: UserProfileService;

  @ApiBody({ type: RegistrateReqDoc })
  @Post('register')
  public async register(@Body() body: RegistrateReqDto): Promise<void> {
    await this.userProfileService.register(body);
  }

  @ApiOkResponse({ type: GetOneUserResDoc })
  @UseGuards(AuthenticatedGuard)
  @Get('my-account')
  public async getMyAccount(
    @Req() req: Request,
  ): Promise<GetOneUserResDtoInterface> {
    const userId = (req.user as SessionUserType)?.id || null;
    if (!userId) throw new ForbiddenException();
    return await this.userProfileService.getMyProfile(userId);
  }
}
