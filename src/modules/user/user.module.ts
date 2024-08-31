import { Module } from '@nestjs/common';
import { UserProfileController } from './presentation/controllers/user-profile.controller';
import { UserModel } from './infrastructure/database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetAllProfilesUseCase } from './application/use-cases/user-profile-admin/get-all-profiles.use-case';
import { UserPasswordService } from './application/services/user-password.service';
import { UserProfileMapper } from './application/mappers/user-profile.mapper';
import { UserProfileService } from './presentation/services/user-profile.service';
import { UserProfileAdminService } from './presentation/services/user-profile-admin.service';
import { GetMyProfileUseCase } from './application/use-cases/user-profile/get-my-profile.use-case';
import { UserFindQueryBuilder } from './infrastructure/database/query-builders/user-find.query-builder';
import { UserUpdateQueryBuilder } from './infrastructure/database/query-builders/user-update.query-builder';
import { UserCreateQueryBuilder } from './infrastructure/database/query-builders/user-create.query-builder';
import { UserCountQueryBuilder } from './infrastructure/database/query-builders/user-count.query-builder';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserProfileController],
  providers: [
    UserProfileService,
    UserProfileAdminService,
    UserProfileMapper,
    UserPasswordService,

    UserFindQueryBuilder,
    UserUpdateQueryBuilder,
    UserCreateQueryBuilder,
    UserCountQueryBuilder,

    GetAllProfilesUseCase,
    GetMyProfileUseCase,
  ],
  exports: [
    UserPasswordService,

    UserFindQueryBuilder,
    UserUpdateQueryBuilder,
    UserCreateQueryBuilder,
  ],
})
export class UserModule {}
