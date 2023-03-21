export abstract class Adapter {
  // entity is any, implementation would be specific to each adapter
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  abstract save<T extends { [key: string]: any }>(instance: T, entity: any): T | Promise<T>;
}
