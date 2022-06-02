import { ObjectAdapter } from './adapters';
import { Adapter } from './adapters/adapter';
import { factoryStorage } from './factory-storage';
import { Sequence } from './sequence';
import { LazyAttribute } from './lazy-attribute';
import { SubFactory } from './subfactory';
import { Constructable, ConstructableAttrs } from './types';
import { LazySequence } from '.';

export abstract class Factory<T> {
  /**
   * The model/entity you wish to create a factory for
   */
  abstract get entity(): Constructable<T>;
  /**
   * List of your entity default fields populated by the factory
   */
  abstract get attrs(): ConstructableAttrs<T>;

  /**
   * Adapter used to save objects
   */
  protected adapter: Adapter = new ObjectAdapter();

  /**
   * Build a factory. Datasource is optional.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor() {}

  /**
   * creates entity without persisting it in the database
   */
  async build(
    values: Partial<T> = {},
    { saveSubFactories }: { saveSubFactories: boolean } = { saveSubFactories: false },
  ): Promise<T> {
    return this.createInstance(values, { saveSubFactories });
  }

  /**
   * creates several entity without persisting it in the database
   */
  async buildMany(count: number, values: Partial<T> = {}): Promise<T[]> {
    const instances: T[] = Array.from({ length: count });
    return Promise.all(instances.map(() => this.createInstance(values, { saveSubFactories: false })));
  }

  /**
   * persist instance (often via a database call)
   */
  private async save<U>(instance: U): Promise<U> {
    return this.adapter.save(instance, this.entity);
  }

  /**
   *
   * Execute all post generators provided
   */
  private async applyPostGenerators(instance: T): Promise<void> {
    const postGenerators = factoryStorage.getPostGenerators(this.constructor.name);
    if (postGenerators?.size) {
      // fnName can't exist in abstract class, it belongs to its children
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      await Promise.all(
        Array.from(postGenerators).map(async (fnName: string | symbol) => (this as any)[fnName](instance)),
      );
    }
  }

  /**
   * build and persist entity
   */
  async create(values: Partial<T> = {}): Promise<T> {
    const instance: T = await this.build(values, { saveSubFactories: true });
    const savedInstance = await this.save(instance);
    await this.applyPostGenerators(savedInstance);
    return savedInstance;
  }

  /**
   * build and persist entity several entities at once
   */
  async createMany(count: number, values: Partial<T> = {}): Promise<T[]> {
    const instances: T[] = Array.from({ length: count });
    for (let index = 0; index < instances.length; index++) {
      instances[index] = await this.createInstance(values, { saveSubFactories: true });
    }
    const savedInstances = await this.save(instances);
    await Promise.all(savedInstances.map((instance) => this.applyPostGenerators(instance)));
    return savedInstances;
  }

  /**
   * Use default factories attrs + optional override to build new objects.
   * First: resolve any subFactory, sequence or function
   * Then: resolve lazy attributes
   * Return instance
   */
  private async createInstance(values: Partial<T>, { saveSubFactories }: { saveSubFactories: boolean }): Promise<T> {
    const instance: T = new this.entity();
    const attrs = { ...this.attrs, ...values };

    // Fill values (expect lazy ones)
    await Promise.all(
      Object.entries(attrs).map(async ([key, value]) => {
        const resolvedValue = await Factory.resolveValue(value, { saveSubFactories });
        Object.assign(instance, { [key]: resolvedValue });
      }),
    );

    // Fill lazy values with instance as a reference
    await Promise.all(
      Object.entries(attrs).map(async ([key, value]) => {
        if (value instanceof LazyAttribute || value instanceof LazySequence) {
          Object.assign(instance, { [key]: await value.resolve(instance) });
        }
      }),
    );

    return instance;
  }

  /**
   * According to the value type, returns a usable value for the entity.
   * It can execute a function, call next for a sequence, create/build on a subFactory or return directly the value
   */
  private static async resolveValue(value: unknown, { saveSubFactories }: { saveSubFactories: boolean }) {
    if (value instanceof SubFactory) {
      return saveSubFactories ? value.factory.create(value.values) : value.factory.build(value.values);
    } else if (value instanceof LazyAttribute) {
      return value;
    } else if (value instanceof LazySequence) {
      return value;
    } else if (value instanceof Sequence) {
      return value.next;
    } else if (value instanceof Function) {
      return value();
    } else {
      return value;
    }
  }
}
export default Factory;
