import type { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { Adapter } from './adapter';

export class TypeormAdapter extends Adapter {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    super();
    this.dataSource = dataSource;
  }

  save<T extends { [key: string]: any }>(instance: T, entity: EntityTarget<T>): Promise<T> {
    return this.dataSource.getRepository(entity).save(instance);
  }
}
