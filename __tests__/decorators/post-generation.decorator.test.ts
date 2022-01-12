import { PostGeneration } from '../../src';
import { factoryStorage } from '../../src/factory-storage';

jest.mock('../../src/factory-storage');

describe('PostGeneration', () => {
  it('should add a post-generation function to the factory storage', () => {
    // When
    const postGeneration = PostGeneration();
    class FakeObj {}
    const target = new FakeObj();
    const propertyKey = 'test';
    const noop = () => {};

    // Given
    postGeneration(target, propertyKey, {
      value: noop,
      writable: true,
      enumerable: false,
      configurable: true,
    });

    // Then
    expect(factoryStorage.addPostGenerator).toHaveBeenCalledWith('FakeObj', propertyKey);
  });
});
