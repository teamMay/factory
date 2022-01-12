import { getRepository } from 'typeorm';

import { TypeormAdapter } from '../../src/adapters/typeorm.adapter';
import { Restaurant } from '../typeormEntities/Restaurant';

jest.mock('typeorm');

describe('TypeormAdapter', () => {
  it('should create an instance', () => {
    // Given
    const adapter = new TypeormAdapter();

    // Then
    expect(adapter).toBeTruthy();
    expect(adapter.save).toBeDefined();
    expect(adapter.save).toBeInstanceOf(Function);
  });

  it('saves method should call getRepository from typeorm and save', () => {
    // Given
    const entity = Restaurant;
    const adapter = new TypeormAdapter();
    const instance = new entity();
    const save = jest.fn().mockReturnValue(instance);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getRepository.mockReturnValue({ save });

    // When
    const result = adapter.save(instance, entity);

    // Then
    expect(result).toBe(instance);
    expect(getRepository).toHaveBeenCalledWith(entity);
    expect(save).toHaveBeenCalledWith(instance);
  });
});
