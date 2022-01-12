import { LazySequence } from '../src';

describe('LazySequence', () => {
  it('should resolve value', async () => {
    // Given
    const callback = (nb: number, instance: any) => `${instance.firstName} ${instance.lastName} n°${nb}`;
    const firstName = 'Luke';
    const lastName = 'Skywalker';
    const lazySequence = new LazySequence(callback);
    const instance = { firstName, lastName };

    // When
    const resolvedValue = lazySequence.resolve(instance);
    const resolvedValue2 = lazySequence.resolve(instance);

    // Then
    expect(resolvedValue).toBe('Luke Skywalker n°0');
    expect(resolvedValue2).toBe('Luke Skywalker n°1');
  });
});
