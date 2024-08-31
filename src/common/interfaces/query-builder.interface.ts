export interface QueryBuilderTransactionableInterface {
  openTransaction(): Promise<void>;
  closeTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}

export interface FindQueryBuildernterface<Entity> {
  build(): FindQueryBuildernterface<Entity>;
  runFindAll(): Promise<Entity[]>;
  runFindOne(): Promise<Entity | null>;
  paginate(page: number, limit: number): FindQueryBuildernterface<Entity>;
}

export interface CountQueryBuilderInterface {
  build(): CountQueryBuilderInterface;
  runCount(): Promise<number>;
}

export interface UpdateQueryBuilderInterface<Entity> {
  silent(): UpdateQueryBuilderInterface<Entity>;
  runUpdate(data: Partial<Entity>): Promise<Entity[]>;
  build(): UpdateQueryBuilderInterface<Entity>;
}

export interface CreateQueryBuilderInterface<Entity> {
  runCreate(data: Partial<Entity>): Promise<Entity>;
}
