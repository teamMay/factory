export abstract class Adapter {
  abstract save<T>(instance: T, entity: any): T | Promise<T>;
}
