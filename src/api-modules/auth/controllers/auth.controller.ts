import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInReqDoc } from '../docs/sign-in.doc';
import { SignUpReqDoc } from '../docs/sign-up.doc';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { SignUpReqDto } from '../dto/sign-up.dto';

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

  @ApiBody({ type: SignUpReqDoc })
  @Post('sign-up')
  public async signUp(@Body() body: SignUpReqDto): Promise<void> {
    await this.authService.singUp(body);
  }
}
