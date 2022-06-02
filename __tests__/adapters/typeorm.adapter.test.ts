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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const adapter = new TypeormAdapter(mockDataSource);

    // When
    const result = adapter.save(instance, entity);

    // Then
    expect(result).toBe(instance);
    expect(mockDataSource.getRepository).toHaveBeenCalledWith(entity);
    expect(save).toHaveBeenCalledWith(instance);
  });
});
