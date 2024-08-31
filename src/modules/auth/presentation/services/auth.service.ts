import { Inject, Injectable } from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';

@Injectable()
export class AuthService {
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;

  public async signIn(login: string, password: string): Promise<UserInterface> {
    return this.signInUseCase.exec(login, password);
  }
}
