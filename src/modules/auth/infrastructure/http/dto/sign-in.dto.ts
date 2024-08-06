import { IsString } from 'class-validator';
import { SignInDtoInterface } from '../interfaces/sign-in.req-interface';
import { ApiProperty } from '@nestjs/swagger';

export class SignInReqDto implements SignInDtoInterface {
  @IsString()
  @ApiProperty({ type: String })
  public login: string;

  @IsString()
  @ApiProperty({ type: String })
  public password: string;
}
