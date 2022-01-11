import { Adapter } from './adapters/adapter';
import { Factory } from './factory';
import { Sequence } from './sequence';
import { SubFactory } from './subfactory';

export type FactoryClass<T> = new () => Factory<T>;
export type Constructable<T> = new (...args: any[]) => T;
export type ConstructableAttrs<T> = {
  [K in keyof Partial<T>]: T[K] | Sequence<T[K]> | ((...args: any[]) => T[K]) | SubFactory<T[K]>;
};
export type SequenceCallback<T> = (nb: number) => T;
export type AdapterClass = new () => Adapter;
