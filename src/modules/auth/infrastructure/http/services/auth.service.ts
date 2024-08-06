import { Inject, Injectable } from '@nestjs/common';
import { SignUpUseCase } from '../../../application/use-cases/sign-up.use-case';
import { SignUpReqDtoInterface } from '../interfaces/sign-up.req-interface';
import { SignInUseCase } from '../../../application/use-cases/sign-in.use-case';
import { UserModel } from '../../../../user/infrastructure/database/models/user.model';

@Injectable()
export class AuthService {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;

  public async signUp(data: SignUpReqDtoInterface): Promise<void> {
    await this.signUpUseCase.exec(data);
  }

  public async signIn(login: string, password: string): Promise<UserModel> {
    return this.signInUseCase.exec(login, password);
  }
}
