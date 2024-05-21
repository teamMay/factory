import type { DataSource, EntityTarget } from 'typeorm';
import { Adapter } from './adapter';

export class TypeormAdapter extends Adapter {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    super();
    this.dataSource = dataSource;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  save<T extends Record<string, any> | Record<string, any>[], E>(instance: T, entity: E): Promise<T> {
    return this.dataSource.getRepository(entity as EntityTarget<T>).save(instance);
  }
}
