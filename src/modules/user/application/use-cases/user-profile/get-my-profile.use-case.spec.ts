/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { UserRoleEnum } from '../../../domain/enums/user-role.enum';
import { GetMyProfileUseCase } from './get-my-profile.use-case';
import { UserFindQueryBuilder } from '../../../infrastructure/database/query-builders/user-find.query-builder';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';
import { UserFindQueryBuilderInterface } from '../../interfaces/query-builders/user-find.query-builder.interface';
import { FindQueryBuildernterface } from '../../../../../common/interfaces/query-builder.interface';

const testUser: UserInterface = {
  id: 1,
  password: 'pass',
  login: 'login',
  email: 'aaa@bbb.com',
  role: UserRoleEnum.admin,
  is_verified: true,
  password_salt: 'asd',
  created_at: new Date(),
  updated_at: new Date(),
  last_login: new Date(),
};

const testFindUserQueryBuilder: UserFindQueryBuilderInterface = {
  byId: function (_id: number): UserFindQueryBuilderInterface {
    return this;
  },
  byLoginOrEmail: function (
    _loginOrEmail: string,
  ): UserFindQueryBuilderInterface {
    throw new Error('Function not implemented.');
  },
  byEmail: function (_email: string): UserFindQueryBuilderInterface {
    throw new Error('Function not implemented.');
  },
  build: function (): FindQueryBuildernterface<UserInterface> {
    return this;
  },
  runFindAll: function (): Promise<UserInterface[]> {
    return Promise.resolve([testUser]);
  },
  runFindOne: (): Promise<UserInterface> => {
    return Promise.resolve(testUser);
  },
  paginate: function (
    _page: number,
    _limit: number,
  ): FindQueryBuildernterface<UserInterface> {
    throw new Error('Function not implemented.');
  },
};

describe('User: gets his account', async () => {
  let useCase: GetMyProfileUseCase;
  let userFindQueryBuilder: UserFindQueryBuilder;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        GetMyProfileUseCase,
        {
          provide: UserFindQueryBuilder,
          useValue: testFindUserQueryBuilder,
        },
      ],
    }).compile();

    useCase = modRef.get(GetMyProfileUseCase);
    userFindQueryBuilder = modRef.get(UserFindQueryBuilder);
  });

  it('returns user profile', async () => {
    await useCase.exec(testUser.id);
    expect(userFindQueryBuilder.build).toHaveBeenCalled();
    expect(userFindQueryBuilder.byId).toHaveBeenCalled();
    expect(userFindQueryBuilder.runFindOne).toHaveBeenCalled();
    expect(useCase.exec(testUser.id)).toEqual(testUser);
  });
});
