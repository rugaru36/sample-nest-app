import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetOneUserResDtoInterface } from '../../dto-interfaces/user-profile/get-one-user.dto-interface';
import { GetOneUserResDoc } from '../user-profile/get-one-user.doc';
import { GetAllUsersResDtoInterface } from '../../dto-interfaces/user-profile-admin/get-all-users.dto-interface';

export class GetAllUsersResDoc implements GetAllUsersResDtoInterface {
  @ApiPropertyOptional({ type: Number })
  public totalCount?: number;
  @ApiProperty({ type: GetOneUserResDoc, isArray: true })
  public users: GetOneUserResDtoInterface[];
}
