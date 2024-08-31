import { Inject, Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignUpReqDtoInterface } from '../dto-interfaces/sign-up.dto-interface';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { UserInterface } from '../../../user/domain/data-interfaces/user.interface';

@Injectable()
export class AuthService {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;

  public async signUp(data: SignUpReqDtoInterface): Promise<void> {
    await this.signUpUseCase.exec(data);
  }

  public async signIn(login: string, password: string): Promise<UserInterface> {
    return this.signInUseCase.exec(login, password);
  }
}
