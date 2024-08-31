import { ApiProperty } from '@nestjs/swagger';
import { RegistrateReqDtoInterface } from '../dto-interfaces/sign-up.dto-interface';

export class RegistrateReqDoc implements RegistrateReqDtoInterface {
  @ApiProperty({ type: String })
  public email: string;
  @ApiProperty({ type: String })
  public login: string;
  @ApiProperty({ type: String })
  public password: string;
}
