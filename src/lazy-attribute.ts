import { LazyAttributeCallback } from './types';

export class LazyAttribute<T, U> {
  callback: LazyAttributeCallback<T, U>;

  constructor(callback: LazyAttributeCallback<T, U>) {
    this.callback = callback;
  }

  resolve(instance: U): T {
    return this.callback(instance);
  }
}
