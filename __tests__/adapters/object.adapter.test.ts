import { ObjectAdapter } from '../../src/adapters/object.adapter';

describe('ObjectAdapter', () => {
  it('should create an instance', () => {
    // Given
    const adapter = new ObjectAdapter();

    // Then
    expect(adapter).toBeTruthy();
    expect(adapter.save).toBeDefined();
    expect(adapter.save).toBeInstanceOf(Function);
  });

  it('saves method should return identity', () => {
    // Given
    const adapter = new ObjectAdapter();
    const instance = {};

    // When
    const result = adapter.save(instance);

    // Then
    expect(result).toBe(instance);
  });
});
