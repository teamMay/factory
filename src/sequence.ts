import { SequenceCallback } from './types';

export class Sequence<T> {
  callback: SequenceCallback<T>;

  private currentIndex: number;

  constructor(callback: SequenceCallback<T>) {
    this.currentIndex = 0;
    this.callback = callback;
  }

  get next(): T {
    const value = this.callback(this.currentIndex);
    this.currentIndex++;
    return value;
  }
}
