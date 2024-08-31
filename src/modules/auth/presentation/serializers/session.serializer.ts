import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SessionUserType } from '../types/session-user.type';
import { UserModel } from '../../../user/infrastructure/database/models/user.model';
import { UserFindQueryBuilder } from '../../../user/infrastructure/database/query-builders/user-find.query-builder';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  @Inject(UserFindQueryBuilder)
  private readonly userFindQueryBuilder: UserFindQueryBuilder;

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
    done: (err: Error, payload: UserInterface) => void,
  ): Promise<any> {
    try {
      if (payload.id) {
        const user = await this.userFindQueryBuilder
          .build()
          .byId(payload.id)
          .runFindOne();
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
