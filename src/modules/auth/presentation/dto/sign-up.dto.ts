import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SignUpReqDtoInterface } from '../dto-interfaces/sign-up.dto-interface';

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
