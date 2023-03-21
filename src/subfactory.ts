import { getDefaultDataSource } from './factories/typeormFactory';
import { Factory } from './factory';
import { FactoryClass } from './types';

export class SubFactory<T extends { [key: string]: any }> {
  factory: Factory<T>;
  values: Partial<T> | undefined;

  constructor(factory: Factory<T> | FactoryClass<T>, values?: Partial<T>) {
    if (factory instanceof Factory) {
      this.factory = factory;
    } else {
      this.factory = new factory(getDefaultDataSource());
    }
    this.values = values;
  }
}
