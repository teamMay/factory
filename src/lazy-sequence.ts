import { LazySequenceCallback } from './types';

export class LazySequence<T, U> {
  callback: LazySequenceCallback<T, U>;
  private currentIndex: number;

  constructor(callback: LazySequenceCallback<T, U>) {
    this.currentIndex = 0;
    this.callback = callback;
  }

  resolve(instance: U): T {
    const value = this.callback(this.currentIndex, instance);
    this.currentIndex++;
    return value;
  }
}
