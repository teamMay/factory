import { Adapter } from './adapter';

export class ObjectAdapter extends Adapter {
  /**
   *  ObjectAdapter does nothing persistance-wise. It does not save the
   * entity in a database, we simply return it.
   * That makes ObjectAdapter factories "create" and "build" methods equivalent.
   */
  save<T>(instance: T): T {
    return instance;
  }
}
