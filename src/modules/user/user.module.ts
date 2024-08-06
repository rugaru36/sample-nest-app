import { Module } from '@nestjs/common';
import { UserProfileController } from './infrastructure/http/controllers/user-profile.controller';
import { UserModel } from './infrastructure/database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './infrastructure/database/services/user.service';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { GetAllProfilesUseCase } from './application/use-cases/user-profile-admin/get-all-profiles.use-case';
import { PasswordService } from './application/services/password.service';
import { UserProfileResolver } from './application/resolvers/user-profile.resolver';
import { UserProfileService } from './infrastructure/http/services/user-profile.service';
import { UserProfileAdminService } from './infrastructure/http/services/user-profile-admin.service';
import { GetMyProfileUseCase } from './application/use-cases/user-profile/get-my-profile.use-case';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    UserProfileAdminService,
    UserProfileResolver,
    PasswordService,
    UserRepository,
    GetAllProfilesUseCase,
    GetMyProfileUseCase,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
