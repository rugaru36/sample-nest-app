import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user: UserInterface = await this.authService.signIn(
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
