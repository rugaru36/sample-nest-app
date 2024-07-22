import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../../../common/model-modules/user/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user: UserModel = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      return null;
      // throw new UnauthorizedException();
    }
    return user;
  }
}
