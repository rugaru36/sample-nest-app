import { ApiProperty } from '@nestjs/swagger';
import { SignUpReqDtoInterface } from '../interfaces/sign-up.req-interface';

export class SignUpReqDoc implements SignUpReqDtoInterface {
  @ApiProperty({ type: String })
  public email: string;
  @ApiProperty({ type: String })
  public login: string;
  @ApiProperty({ type: String })
  public password: string;
}
