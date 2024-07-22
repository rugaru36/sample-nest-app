import { GetOneUserResInterface } from './get-one-user.interface';

// --------------------- req ---------------------
export interface GetAllUsersReqInterface {
  withTotalCount: boolean;
  page: number;
  limit: number;
}

// --------------------- res ---------------------
export interface GetAllUsersResInterface {
  totalCount?: number;
  users: GetOneUserResInterface[];
}
