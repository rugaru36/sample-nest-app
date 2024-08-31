import { Module } from '@nestjs/common';
import { UserProfileController } from './infrastructure/http/controllers/user-profile.controller';
import { UserModel } from './infrastructure/database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './infrastructure/database/services/user.service';
import { GetAllProfilesUseCase } from './application/use-cases/user-profile-admin/get-all-profiles.use-case';
import { UserPasswordService } from './application/services/user-password.service';
import { UserProfileMapper } from './application/mappers/user-profile.mapper';
import { UserProfileService } from './infrastructure/http/services/user-profile.service';
import { UserProfileAdminService } from './infrastructure/http/services/user-profile-admin.service';
import { GetMyProfileUseCase } from './application/use-cases/user-profile/get-my-profile.use-case';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    UserProfileAdminService,
    UserProfileMapper,
    UserPasswordService,
    GetAllProfilesUseCase,
    GetMyProfileUseCase,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
