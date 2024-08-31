import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthenticatedGuard } from './presentation/guards/authenticated.guard';
import { LocalAuthAdminGuard } from './presentation/guards/local-auth-admin.guard';
import { LocalAuthGuard } from './presentation/guards/local-auth.guard';
import { RolesGuard } from './presentation/guards/role.guard';
import { SessionSerializer } from './presentation/serializers/session.serializer';
import { LocalStrategy } from './presentation/strategy/local.strategy';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { AuthService } from './presentation/services/auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
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
