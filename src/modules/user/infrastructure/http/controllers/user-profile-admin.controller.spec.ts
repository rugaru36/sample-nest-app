import { Test } from '@nestjs/testing';
import { UserProfileAdminService } from '../services/user-profile-admin.service';
import { UserProfileAdminController } from './user-profile-admin.controller';
import {
  GetAllUsersReqDtoInterface,
  GetAllUsersResDtoInterface,
} from '../dto-interfaces/user-profile-admin/get-all-users.dto-interface';

// requests
const testReqGetAllWithNoCount: GetAllUsersReqDtoInterface = {
  withTotalCount: false,
  page: 1,
  limit: 10,
};

const testReqGetAllWithCount: GetAllUsersReqDtoInterface = Object.assign<
  GetAllUsersReqDtoInterface,
  Pick<GetAllUsersReqDtoInterface, 'withTotalCount'>
>(testReqGetAllWithNoCount, { withTotalCount: true });

// responses
const tesRestGetAllUsersResultWithNoCount: GetAllUsersResDtoInterface = {
  users: [
    {
      id: 5,
      login: 'login',
      email: 'email@test.com',
      is_verified: true,
      last_login: new Date(),
    },
  ],
};

const testResGetAllUsersResultWithCount: GetAllUsersResDtoInterface =
  Object.assign<
    Pick<GetAllUsersResDtoInterface, 'users'>,
    Pick<GetAllUsersResDtoInterface, 'totalCount'>
  >(tesRestGetAllUsersResultWithNoCount, { totalCount: 123 });

describe('getting user profiles as admin controller', () => {
  let controller: UserProfileAdminController;
  let service: UserProfileAdminService;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      controllers: [UserProfileAdminController],
      providers: [
        {
          provide: UserProfileAdminService,
          useValue: {
            getAllProfiles: jest
              .fn()
              .mockImplementation((q: GetAllUsersReqDtoInterface) => {
                return q.withTotalCount
                  ? Promise.resolve(testResGetAllUsersResultWithCount)
                  : Promise.resolve(tesRestGetAllUsersResultWithNoCount);
              }),
          },
        },
      ],
    }).compile();
    controller = modRef.get(UserProfileAdminController);
    service = modRef.get(UserProfileAdminService);
  });

  it('Admin: gets all user profiles with total count', async () => {
    await controller.getAllUsers(testReqGetAllWithCount);
    expect(service.getAllProfiles).toHaveBeenCalled();
    expect(controller.getAllUsers(testReqGetAllWithCount)).resolves.toEqual(
      testResGetAllUsersResultWithCount,
    );
  });

  it('Admin: get all user profiles without total count', async () => {
    await controller.getAllUsers(testReqGetAllWithNoCount);
    expect(service.getAllProfiles).toHaveBeenCalled();
    expect(controller.getAllUsers(testReqGetAllWithNoCount)).resolves.toEqual(
      testResGetAllUsersResultWithCount,
    );
  });
});
