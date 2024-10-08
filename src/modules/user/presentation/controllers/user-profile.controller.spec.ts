import { Test } from '@nestjs/testing';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UserShortDataInterface } from '../../domain/data-interfaces/user-short-data.interface';
import { SessionUserType } from '../../../auth/presentation/types/session-user.type';
import { UserRoleEnum } from '../../domain/enums/user-role.enum';
import { Request } from 'express';
import { ForbiddenException } from '@nestjs/common';

const testSessionUser: SessionUserType = {
  id: 4,
  role: UserRoleEnum.user,
  login: 'login',
};

const testRequestWithSessionUser: Request = {
  user: testSessionUser,
} as any as Request;

const testRequestWithNoSessionUser: Request = {} as any as Request;

const testUserProfile: UserShortDataInterface = {
  id: testSessionUser.id,
  is_verified: true,
  login: testSessionUser.login,
  email: 'aaa@bbb.com',
  last_login: new Date(),
};

describe('User account data', () => {
  let controller: UserProfileController;
  let service: UserProfileService;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            getMyProfile: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve({ ...testUserProfile, id });
            }),
          },
        },
      ],
    }).compile();
    controller = modRef.get(UserProfileController);
    service = modRef.get(UserProfileService);
  });

  it('returns user profile', async () => {
    await controller.getMyAccount(testRequestWithSessionUser);
    expect(service.getMyProfile).toHaveBeenCalled();
    expect(
      controller.getMyAccount(testRequestWithSessionUser),
    ).resolves.toEqual(testUserProfile);
  });

  it('throws forbidden exception', async () => {
    expect(
      controller.getMyAccount(testRequestWithNoSessionUser),
    ).rejects.toBeInstanceOf(ForbiddenException);
    // await controller.getMyAccount()
  });
});
