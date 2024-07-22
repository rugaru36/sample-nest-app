import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserModelService } from './services/user.model-service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserModelService],
  exports: [UserModelService],
})
export class UserModelModule {}
