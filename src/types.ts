import type { DataSource } from 'typeorm';
import { Adapter } from './adapters/adapter';
import { Factory } from './factory';
import { LazyAttribute } from './lazy-attribute';
import { LazySequence } from './lazy-sequence';
import { Sequence } from './sequence';
import { SubFactory } from './subfactory';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type FactoryClass<T extends Record<string, any>> = new (dataSource?: DataSource) => Factory<T>;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Constructable<T extends Record<string, any>> = new () => T;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ConstructableAttrs<T extends Record<string, any>> = {
  [K in keyof Partial<T>]:
    | T[K]
    | Sequence<T[K]>
    | LazyAttribute<Promise<T[K]>, T>
    | LazyAttribute<T[K], T>
    | LazySequence<Promise<T[K]>, T>
    | LazySequence<T[K], T>
    | (() => T[K])
    | SubFactory<T[K]>;
};
export type SequenceCallback<T> = (nb: number) => T;
export type AdapterClass = new () => Adapter;
export type LazyAttributeCallback<T, U> = (instance: U) => T;
export type LazySequenceCallback<T, U> = (nb: number, instance: U) => T;
