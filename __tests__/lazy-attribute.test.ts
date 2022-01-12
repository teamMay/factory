import { LazyAttribute } from '../src';

describe('LazyAttribute', () => {
  it('should resolve value', async () => {
    // Given
    const firstName = 'Luke';
    const lastName = 'Skywalker';
    const instance = { firstName, lastName };
    const callback = (obj: typeof instance) => `${obj.firstName} ${obj.lastName}`;
    const lazyAttribute = new LazyAttribute(callback);

    // When
    const resolvedValue = lazyAttribute.resolve(instance);

    // Then
    expect(resolvedValue).toBe('Luke Skywalker');
  });
});
