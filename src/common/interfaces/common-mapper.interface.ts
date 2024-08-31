export interface CommonMapperInterface<Input, Output> {
  single(d: Input): Output;
  list(d: Input[]): Output[];
}
