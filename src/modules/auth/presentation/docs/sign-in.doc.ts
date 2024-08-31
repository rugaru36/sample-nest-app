import { ApiProperty } from '@nestjs/swagger';
import { SignInReqDtoInterface } from '../dto-interfaces/sign-in.dto-interface';

export class SignInReqDoc implements SignInReqDtoInterface {
  @ApiProperty({ type: String })
  public login: string;
  @ApiProperty({ type: String })
  public password: string;
}
