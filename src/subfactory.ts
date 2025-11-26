import { getDefaultDataSource } from './factories/typeormHelper';
import { Factory } from './factory';
import { type FactoryClass } from './types';

export class SubFactory<T extends Record<string, any>> {
  factory: Factory<T>;
  values: Partial<T> | undefined;

  constructor(factory: Factory<T> | FactoryClass<T>, values?: Partial<T>) {
    if (factory instanceof Factory) {
      this.factory = factory;
    } else {
      this.factory = new (factory as FactoryClass<T>)(getDefaultDataSource());
    }
    this.values = values;
  }
}
