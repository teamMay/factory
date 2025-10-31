import { Adapter } from './adapter';

export class ObjectAdapter<T extends Record<string, any> | Record<string, any>[]> extends Adapter<T, []> {
  /**
   *  ObjectAdapter does nothing persistance-wise. It does not save the
   * entity in a database, we simply return it.
   * That makes ObjectAdapter factories "create" and "build" methods equivalent.
   */
  save<U extends T | T[]>(instance: U): U {
    return instance;
  }
}
