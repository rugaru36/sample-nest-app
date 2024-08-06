import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/infrastructure/database/services/user.service';
import { SignUpReqDtoInterface } from '../../infrastructure/http/interfaces/sign-up.req-interface';

@Injectable()
export class SignUpUseCase {
  @Inject(UserService)
  private readonly userService: UserService;

  public async exec(data: SignUpReqDtoInterface): Promise<void> {
    await this.userService.createUser(data);
  }
}
