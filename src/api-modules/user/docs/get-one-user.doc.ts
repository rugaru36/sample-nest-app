import { ApiProperty } from '@nestjs/swagger';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';

export class GetOneUserResDoc implements GetOneUserResInterface {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  is_verified: boolean;
  @ApiProperty({ type: String })
  login: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String, description: 'date string' })
  last_login: Date;
}
