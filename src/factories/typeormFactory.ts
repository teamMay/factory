import type { DataSource, ObjectLiteral } from 'typeorm';
import { TypeormAdapter } from '../adapters';
import { Factory } from '../factory';
import { Constructable } from '../types';
import { getDefaultDataSource } from './typeormHelper';

/**
 * This is a Factory with the typeormAdapter already set
 */
export abstract class TypeormFactory<T extends ObjectLiteral> extends Factory<T> {
  adapter: TypeormAdapter<T>;
  dataSource: DataSource;
  entity: Constructable<T>;

  constructor(dataSource?: DataSource) {
    super();
    this.dataSource = getDefaultDataSource() ?? dataSource;
    if (!this.dataSource) {
      throw new Error('No dataSource provided. You should either provide a default one or pass one in the constructor');
    }
    this.adapter = new TypeormAdapter(this.dataSource);
  }

  protected save(instance: T): Promise<T>;
  protected save(instance: T[]): Promise<T[]>;
  protected save(instance: T | T[]): Promise<T | T[]> {
    this.adapter.entity = this.entity;
    // @ts-expect-error typescript inference is not working as expected here. To help it we could do Array.isArray(instance) ? super.save(instance) : super.save(instance) but it would be ugly
    return super.save(instance);
  }
}

export default TypeormFactory;
