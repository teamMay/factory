import { LazyAttribute } from '../src';

describe('LazyAttribute', () => {
  it('should resolve value', async () => {
    const callback = (instance: any) => `${instance.firstName} ${instance.lastName}`;
    const firstName = 'Luke';
    const lastName = 'Skywalker';
    const lazyAttribute = new LazyAttribute(callback);
    const instance = { firstName, lastName };
    const resolvedValue = lazyAttribute.resolve(instance);
    expect(resolvedValue).toBe('Luke Skywalker');
  });
});
