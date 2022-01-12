import { LazySequence } from '../src';

describe('LazySequence', () => {
  it('should resolve value', async () => {
    // Given
    const firstName = 'Luke';
    const lastName = 'Skywalker';
    const instance = { firstName, lastName };
    const callback = (nb: number, obj: typeof instance) => `${obj.firstName} ${obj.lastName} n°${nb}`;
    const lazySequence = new LazySequence(callback);

    // When
    const resolvedValue = lazySequence.resolve(instance);
    const resolvedValue2 = lazySequence.resolve(instance);

    // Then
    expect(resolvedValue).toBe('Luke Skywalker n°0');
    expect(resolvedValue2).toBe('Luke Skywalker n°1');
  });
});
