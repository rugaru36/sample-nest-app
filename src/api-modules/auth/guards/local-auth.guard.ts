import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    try {
      const result = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
      return result;
    } catch (e) {
      console.error((e as Error).message);
      return false;
    }
  }

  handleRequest(err, user) {
    if (err) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
