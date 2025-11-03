import type { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { Adapter } from './adapter';

export class TypeormAdapter<T extends ObjectLiteral> extends Adapter<T> {
  private dataSource: DataSource;
  entity: EntityTarget<T>;

  constructor(dataSource: DataSource) {
    super();
    this.dataSource = dataSource;
  }

  save<U extends T>(instance: U): Promise<U>;
  save<U extends T[]>(instance: U): Promise<U> {
    return this.dataSource.getRepository(this.entity).save(instance) as Promise<U>;
  }
}
