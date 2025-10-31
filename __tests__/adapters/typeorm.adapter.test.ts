import { TypeormAdapter } from '../../src/adapters/typeorm.adapter';
import { dataSource } from '../setup/jest.setup';
import { Restaurant } from '../typeormEntities/Restaurant';

jest.mock('typeorm');

describe('TypeormAdapter', () => {
  it('should create an instance', () => {
    // Given
    const adapter = new TypeormAdapter(dataSource);

    // Then
    expect(adapter).toBeTruthy();
    expect(adapter.save).toBeDefined();
    expect(adapter.save).toBeInstanceOf(Function);
  });

  it('saves method should call getRepository from typeorm and save', () => {
    // Given
    const entity = Restaurant;
    const instance = new entity();
    const save = jest.fn().mockReturnValue(instance);
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue({ save }),
    };

    // @ts-expect-error mockDataSource is not an actual DataSource
    const adapter = new TypeormAdapter(mockDataSource);
    adapter.entity = entity;

    // When
    const result = adapter.save(instance);

    // Then
    expect(result).toBe(instance);
    expect(mockDataSource.getRepository).toHaveBeenCalledWith(entity);
    expect(save).toHaveBeenCalledWith(instance);
  });
});
