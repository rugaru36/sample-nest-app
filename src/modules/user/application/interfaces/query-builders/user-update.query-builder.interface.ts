import { UpdateQueryBuilderInterface } from '../../../../../common/interfaces/query-builder.interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';

export interface UserUpdateQueryBuilderInterface
  extends UpdateQueryBuilderInterface<UserInterface> {
  byId(id: number): UserUpdateQueryBuilderInterface;
}
