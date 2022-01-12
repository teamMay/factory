import { Adapter } from './adapters/adapter';
import { Factory } from './factory';
import { LazyAttribute } from './lazy-attribute';
import { LazySequence } from './lazy-sequence';
import { Sequence } from './sequence';
import { SubFactory } from './subfactory';

export type FactoryClass<T> = new () => Factory<T>;
export type Constructable<T> = new () => T;
export type ConstructableAttrs<T> = {
  [K in keyof Partial<T>]:
    | T[K]
    | Sequence<T[K]>
    | LazyAttribute<T[K], T>
    | LazySequence<T[K], T>
    | (() => T[K])
    | SubFactory<T[K]>;
};
export type SequenceCallback<T> = (nb: number) => T;
export type AdapterClass = new () => Adapter;
export type LazyAttributeCallback<T, U> = (instance: U) => T;
export type LazySequenceCallback<T, U> = (nb: number, instance: U) => T;
