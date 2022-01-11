import { ObjectAdapter, TypeormAdapter } from './adapters';
import { Adapter } from './adapters/adapter';
import { factoryStorage } from './factory-storage';
import { Sequence } from './sequence';
import { SubFactory } from './subfactory';
import { Constructable, ConstructableAttrs } from './types';

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
    if (postGenerators?.length) {
      await Promise.all(postGenerators.map(async (fnName: string) => (this as any)[fnName](instance)));
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
   * Resolves any subFactory, sequence or function before returning
   */
  private async createInstance(values: Partial<T>, { saveSubFactories }: { saveSubFactories: boolean }): Promise<T> {
    const instance: T = new this.entity();

    await Promise.all(
      Object.entries(this.attrs).map(async ([key, value]) => {
        // Take value overriden first if provided. Value from the defined factory otherwise
        const _value = Object.prototype.hasOwnProperty.call(values, key) ? values[key as keyof T] : value;
        const resolvedValue = await Factory.resolveValue(_value, { saveSubFactories });
        Object.assign(instance, { [key]: resolvedValue });
      }),
    );

    return instance;
  }

  /**
   * According to the value type, returns a usable value for the entity.
   * It can execute a function, call next for a sequence, create/build on a subfactory or return directly the value
   */
  private static async resolveValue(value: unknown, { saveSubFactories }: { saveSubFactories: boolean }) {
    if (value instanceof SubFactory) {
      return saveSubFactories ? value.factory.create(value.values) : value.factory.build(value.values);
    } else if (value instanceof Sequence) {
      return value.next;
    } else if (value instanceof Function) {
      return value();
    } else {
      return value;
    }
  }
}

/**
 * This is a Factory with the typeormAdapter already set
 */
export abstract class TypeormFactory<T> extends Factory<T> {
  adapter = new TypeormAdapter();
}
