export abstract class Adapter<T extends Record<string, any> | Record<string, any>[], args extends any[] = any[]> {
  // entity is any, implementation would be specific to each adapter
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */

  abstract save(instance: T, ...args: args): Promise<T>;
  abstract save(instance: T[], ...args: args): Promise<T[]>;
}
