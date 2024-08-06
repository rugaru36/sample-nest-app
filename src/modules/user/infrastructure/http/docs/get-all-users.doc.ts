import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetOneUserResDoc } from './get-one-user.doc';
import { GetAllUsersResInterface } from '../interfaces/get-all-users.interface';
import { GetOneUserResInterface } from '../interfaces/get-one-user.interface';

export class GetAllUsersResDoc implements GetAllUsersResInterface {
  @ApiPropertyOptional({ type: Number })
  public totalCount?: number;
  @ApiProperty({ type: GetOneUserResDoc, isArray: true })
  public users: GetOneUserResInterface[];
}
