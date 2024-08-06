import { GetOneUserResDtoInterface } from './get-one-user.dto-interface';

// --------------------- req ---------------------
export interface GetAllUsersReqDtoInterface {
  withTotalCount: boolean;
  page: number;
  limit: number;
}

// --------------------- res ---------------------
export interface GetAllUsersResDtoInterface {
  totalCount?: number;
  users: GetOneUserResDtoInterface[];
}
