export interface CommonResolverInterface<Input, Output> {
  single(d: Input): Output;
  list(d: Input[]): Output[];
}
