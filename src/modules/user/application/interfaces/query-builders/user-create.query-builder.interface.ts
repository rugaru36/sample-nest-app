import { CreateQueryBuilderInterface } from '../../../../../common/interfaces/query-builder.interface';
import { UserInterface } from '../../../domain/data-interfaces/user.interface';

export interface UserCreateQueryBuilderInterface
  extends CreateQueryBuilderInterface<UserInterface> {}
