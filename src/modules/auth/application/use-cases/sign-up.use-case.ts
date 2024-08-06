import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/infrastructure/database/services/user.service';
import { SignUpReqDtoInterface } from '../../infrastructure/http/dto-interfaces/sign-up.dto-interface';

@Injectable()
export class SignUpUseCase {
  @Inject(UserService)
  private readonly userService: UserService;

  public async exec(data: SignUpReqDtoInterface): Promise<void> {
    await this.userService.createUser(data);
  }
}
