import { IsBoolean, IsInt } from 'class-validator';
import { GetAllUsersReqInterface } from '../interfaces/get-all-users.interface';
import { Transform } from 'class-transformer';

export class GetAllUsersReqDto implements GetAllUsersReqInterface {
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
