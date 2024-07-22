import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SignUpReqDtoInterface } from '../interfaces/sign-up.req-interface';

export class SignUpReqDto implements SignUpReqDtoInterface {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
