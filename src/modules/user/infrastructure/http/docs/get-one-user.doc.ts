import { ApiProperty } from '@nestjs/swagger';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';

export class GetOneUserResDoc implements GetOneUserResInterface {
  @ApiProperty({ type: Number })
  public id: number;
  @ApiProperty({ type: String })
  public is_verified: boolean;
  @ApiProperty({ type: String })
  public login: string;
  @ApiProperty({ type: String })
  public email: string;
  @ApiProperty({ type: String, description: 'date string' })
  public last_login: Date;
}
