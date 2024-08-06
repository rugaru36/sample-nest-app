import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthenticatedGuard } from './infrastructure/http/guards/authenticated.guard';
import { LocalAuthAdminGuard } from './infrastructure/http/guards/local-auth-admin.guard';
import { LocalAuthGuard } from './infrastructure/http/guards/local-auth.guard';
import { RolesGuard } from './infrastructure/http/guards/role.guard';
import { SessionSerializer } from './infrastructure/http/serializers/session.serializer';
import { LocalStrategy } from './infrastructure/http/strategy/local.strategy';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { AuthService } from './infrastructure/http/services/auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    SignUpUseCase,
    SignInUseCase,

    AuthService,
    // guards + strategies
    LocalStrategy,
    AuthenticatedGuard,
    LocalAuthGuard,
    RolesGuard,
    LocalAuthAdminGuard,
    // serializers
    SessionSerializer,
  ],
})
export class AuthModule {}
