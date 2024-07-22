import { ApiProperty } from '@nestjs/swagger';
import { SignInDtoInterface } from '../interfaces/sign-in.req-interface';

export class SignInReqDoc implements SignInDtoInterface {
  @ApiProperty({ type: String })
  public login: string;
  @ApiProperty({ type: String })
  public password: string;
}
