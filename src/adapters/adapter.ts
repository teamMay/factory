export abstract class Adapter<T extends Record<string, any> | Record<string, any>[], args extends any[] = any[]> {
  abstract save(instance: T, ...args: args): Promise<T>;
  abstract save(instance: T[], ...args: args): Promise<T[]>;
}
