import { ObjectAdapter } from '../adapters/object.adapter';
import { Factory } from '../factory';
import { Constructable } from '../types';

class EmptyClass {}

export abstract class ObjectFactory<T extends Record<string, any>> extends Factory<T> {
  adapter = new ObjectAdapter<T>();
  protected entity: Constructable<T> = EmptyClass as Constructable<T>;
}
