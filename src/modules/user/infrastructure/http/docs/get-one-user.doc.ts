import { ApiProperty } from '@nestjs/swagger';
import { GetOneUserResDtoInterface } from '../dto-interfaces/get-one-user.dto-interface';

export class GetOneUserResDoc implements GetOneUserResDtoInterface {
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
