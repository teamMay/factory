import type { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { TypeormAdapter } from '../adapters';
import { Factory } from '../factory';
import { Constructable } from '../types';

let defaultDataSource: DataSource;
export const getDefaultDataSource = () => {
  return defaultDataSource;
};

export const setDefaultDataSource = (dataSource: DataSource) => {
  defaultDataSource = dataSource;
};
/**
 * This is a Factory with the typeormAdapter already set
 */
export abstract class TypeormFactory<T extends ObjectLiteral> extends Factory<T> {
  adapter: TypeormAdapter<T>;
  dataSource: DataSource;
  entity: Constructable<T>;

  constructor(dataSource?: DataSource) {
    super();
    this.dataSource = defaultDataSource ?? dataSource;
    if (!this.dataSource) {
      throw new Error('No dataSource provided. You should either provide a default one or pass one in the constructor');
    }
    this.adapter = new TypeormAdapter(this.dataSource);
  }

  protected async save<U extends T | T[]>(instance: U): Promise<U> {
    this.adapter.entity = this.entity;
    return super.save(instance);
  }
}

export default TypeormFactory;
