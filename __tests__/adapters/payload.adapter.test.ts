import { PayloadAdapter } from '../../src/adapters/payload.adapter';
import type { CollectionSlug, Payload } from 'payload';

jest.mock('payload');

describe('PayloadAdapter', () => {
  it('should create an instance', () => {
    // Given
    const mockPayload = {
      create: jest.fn(),
    } as unknown as Payload;
    const slug = 'users' as CollectionSlug;

    // When
    const adapter = new PayloadAdapter(mockPayload, slug);

    // Then
    expect(adapter).toBeTruthy();
    expect(adapter.save).toBeDefined();
    expect(adapter.save).toBeInstanceOf(Function);
  });

  it('saves method should call payload.create with correct parameters for single instance', async () => {
    // Given
    const instance = { name: 'John Doe', email: 'john@example.com' };
    const savedInstance = { id: '1', ...instance };
    const create = jest.fn().mockResolvedValue(savedInstance);
    const mockPayload = {
      create,
    } as unknown as Payload;
    const slug = 'users' as CollectionSlug;

    const adapter = new PayloadAdapter(mockPayload, slug);

    // When
    const result = await adapter.save(instance);

    // Then
    expect(result).toBe(savedInstance);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      collection: slug,
      data: instance,
      draft: false,
      locale: 'en',
    });
  });

  it('saves method should use default parameter when enpty object is passed', async () => {
    // Given
    const instance = { name: 'Test User', email: 'test@example.com' };
    const savedInstance = { id: '1', ...instance };
    const create = jest.fn().mockResolvedValue(savedInstance);
    const mockPayload = {
      create,
    } as unknown as Payload;
    const slug = 'users' as CollectionSlug;

    const adapter = new PayloadAdapter(mockPayload, slug);

    // When - explicitly pass undefined to trigger default parameter
    const result = await adapter.save(instance, {});

    // Then
    expect(result).toBe(savedInstance);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      collection: slug,
      data: instance,
      draft: false,
      locale: 'en',
    });
  });

  it('saves method should call payload.create with custom options', async () => {
    // Given
    const instance = { name: 'Jane Doe', email: 'jane@example.com' };
    const savedInstance = { id: '2', ...instance };
    const create = jest.fn().mockResolvedValue(savedInstance);
    const mockPayload = {
      create,
    } as unknown as Payload;
    const slug = 'posts' as CollectionSlug;

    const adapter = new PayloadAdapter(mockPayload, slug);

    // When
    const result = await adapter.save(instance, { draft: true, locale: 'fr' });

    // Then
    expect(result).toBe(savedInstance);
    expect(create).toHaveBeenCalledWith({
      collection: slug,
      data: instance,
      draft: true,
      locale: 'fr',
    });
  });

  it('saves method should handle array of instances', async () => {
    // Given
    const instances = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
    ];
    const savedInstances = [
      { id: '1', ...instances[0] },
      { id: '2', ...instances[1] },
    ];
    const create = jest.fn().mockResolvedValueOnce(savedInstances[0]).mockResolvedValueOnce(savedInstances[1]);
    const mockPayload = {
      create,
    } as unknown as Payload;
    const slug = 'users' as CollectionSlug;

    const adapter = new PayloadAdapter(mockPayload, slug);

    // When
    const result = await adapter.save(instances);

    // Then
    expect(result).toEqual(savedInstances);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create).toHaveBeenNthCalledWith(1, {
      collection: slug,
      data: instances[0],
      draft: false,
      locale: 'en',
    });
    expect(create).toHaveBeenNthCalledWith(2, {
      collection: slug,
      data: instances[1],
      draft: false,
      locale: 'en',
    });
  });

  it('saves method should handle array of instances with custom options', async () => {
    // Given
    const instances = [{ name: 'Test User', email: 'test@example.com' }];
    const savedInstance = { id: '1', ...instances[0] };
    const create = jest.fn().mockResolvedValue(savedInstance);
    const mockPayload = {
      create,
    } as unknown as Payload;
    const slug = 'users' as CollectionSlug;

    const adapter = new PayloadAdapter(mockPayload, slug);

    // When
    const result = await adapter.save(instances, { draft: true, locale: 'de' });

    // Then
    expect(result).toEqual([savedInstance]);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      collection: slug,
      data: instances[0],
      draft: true,
      locale: 'de',
    });
  });
});
