import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../../user/infrastructure/database/models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user: UserModel = await this.authService.signIn(username, password);
    if (!user) {
      return null;
      // throw new UnauthorizedException();
    }
    return user;
  }
}
