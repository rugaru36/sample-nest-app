import { Test } from '@nestjs/testing';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UserProfileEntityInterface } from '../../../domain/entity-interfaces/user-profile.entity-interface';
import { SessionUserType } from '../../../../auth/infrastructure/http/types/session-user.type';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { Request } from 'express';

const testSessionUser: SessionUserType = {
  id: 4,
  role: UserRoleEnum.user,
  login: 'login',
};

const testRequestWithSessionUser: Request = {
  user: testSessionUser,
} as any as Request;

const testUserProfile: UserProfileEntityInterface = {
  id: testSessionUser.id,
  is_verified: true,
  login: testSessionUser.login,
  email: 'aaa@bbb.com',
  last_login: new Date(),
};

describe('user gets his account data', () => {
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

  it('user gets', async () => {
    await controller.getMyAccount(testRequestWithSessionUser);
    expect(service.getMyProfile).toHaveBeenCalled();
    expect(
      controller.getMyAccount(testRequestWithSessionUser),
    ).resolves.toEqual(testUserProfile);
  });
});
