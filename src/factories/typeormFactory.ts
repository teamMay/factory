import type { DataSource, ObjectLiteral } from 'typeorm';
import { TypeormAdapter } from '../adapters';
import { Factory } from '../factory';

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
  adapter: TypeormAdapter;
  dataSource: DataSource;
  constructor(dataSource?: DataSource) {
    super();
    this.dataSource = defaultDataSource ?? dataSource;
    if (!this.dataSource) {
      throw new Error('No dataSource provided. You should either provide a default one or pass one in the constructor');
    }
    this.adapter = new TypeormAdapter(this.dataSource);
  }
}

export default TypeormFactory;
