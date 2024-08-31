import { FindQueryBuildernterface } from '../../../../../common/interfaces/query-builder.interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';

export interface UserFindQueryBuilderInterface
  extends FindQueryBuildernterface<UserInterface> {
  byId(id: number): UserFindQueryBuilderInterface;
  byLoginOrEmail(loginOrEmail: string): UserFindQueryBuilderInterface;
  byEmail(email: string): UserFindQueryBuilderInterface;
}
