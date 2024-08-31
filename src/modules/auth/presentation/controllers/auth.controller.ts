import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInReqDoc } from '../docs/sign-in.doc';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @ApiBody({ type: SignInReqDoc })
  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  public async signIn(): Promise<void> {
    return;
  }
}
