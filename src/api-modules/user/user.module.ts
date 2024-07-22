import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserModelModule } from '../../common/model-modules/user/user-model.module';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [UserModelModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
