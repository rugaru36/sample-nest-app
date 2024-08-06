import { IsBoolean, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { GetAllUsersReqDtoInterface } from '../../dto-interfaces/user-profile-admin/get-all-users.dto-interface';

export class GetAllUsersReqDto implements GetAllUsersReqDtoInterface {
  @IsBoolean()
  @Transform(({ value }) => value == 'true')
  withTotalCount: boolean;

  @IsInt()
  @Transform(({ value }) => ++value)
  page: number;

  @IsInt()
  @Transform(({ value }) => ++value)
  limit: number;
}
