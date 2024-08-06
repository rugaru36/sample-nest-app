import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../../../user/infrastructure/database/services/user.service';
import { SessionUserType } from '../../../../../common/types/session-user.type';
import { UserModel } from '../../../../user/infrastructure/database/models/user.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  @Inject(UserService)
  private readonly userService: UserService;

  serializeUser(
    user: UserModel,
    done: (err: Error, user: SessionUserType) => void,
  ): any {
    try {
      if (user) {
        return done(null, {
          id: user.id,
          role: user.role,
          login: user.login,
        });
      }
      return done(
        new BadRequestException('Serialize: user not authenticated'),
        null,
      );
    } catch (e) {
      return done(new BadRequestException(e), null);
    }
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: UserModel) => void,
  ): Promise<any> {
    try {
      if (payload.id) {
        const user = await (async () => {
          return await this.userService.getById(payload.id);
        })();
        return done(null, user);
      }
      return done(
        new UnauthorizedException('Deserialize: user not authenticated'),
        null,
      );
    } catch (err) {
      return done(new BadRequestException(err), null);
    }
  }
}
