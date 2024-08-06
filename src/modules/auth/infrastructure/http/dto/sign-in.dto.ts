import { IsString } from 'class-validator';
import { SignInReqDtoInterface } from '../dto-interfaces/sign-in.dto-interface';
import { ApiProperty } from '@nestjs/swagger';

export class SignInReqDto implements SignInReqDtoInterface {
  @IsString()
  @ApiProperty({ type: String })
  public login: string;

  @IsString()
  @ApiProperty({ type: String })
  public password: string;
}
