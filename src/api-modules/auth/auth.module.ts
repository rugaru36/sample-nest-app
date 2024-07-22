import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthAdminGuard } from './guards/local-auth-admin.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { SessionSerializer } from './serializers/session.serializer';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModelModule } from '../../common/model-modules/user/user-model.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    UserModelModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
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
