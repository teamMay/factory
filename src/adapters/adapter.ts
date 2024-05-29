export abstract class Adapter {
  // entity is any, implementation would be specific to each adapter
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  abstract save<T extends Record<string, any> | Record<string, any>[], E>(instance: T, entity: E): T | Promise<T>;
}
