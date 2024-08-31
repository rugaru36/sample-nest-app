import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegistrateReqDtoInterface } from '../dto-interfaces/sign-up.dto-interface';

export class RegistrateReqDto implements RegistrateReqDtoInterface {
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
