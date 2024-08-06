import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetOneUserResDoc } from './get-one-user.doc';
import { GetAllUsersResDtoInterface } from '../dto-interfaces/get-all-users.dto-interface';
import { GetOneUserResDtoInterface } from '../dto-interfaces/get-one-user.dto-interface';

export class GetAllUsersResDoc implements GetAllUsersResDtoInterface {
  @ApiPropertyOptional({ type: Number })
  public totalCount?: number;
  @ApiProperty({ type: GetOneUserResDoc, isArray: true })
  public users: GetOneUserResDtoInterface[];
}
