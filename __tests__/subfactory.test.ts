import { SubFactory, getDefaultDataSource, setDefaultDataSource } from '../src';
import { RestaurantFactory } from './factories/restaurant.factory';
import { CookFactory } from './typeormFactories/cook.factory';

describe('SubFactory', () => {
  it('is a wrapper which saves a factory and values to be overridden', () => {
    // Given
    const factory = RestaurantFactory;
    const values = { name: "Rest'o'rant" };

    // When
    const subFactory = new SubFactory(new RestaurantFactory(), values);

    // Then
    expect(subFactory.factory).toBeInstanceOf(factory);
    expect(subFactory.values).toEqual(values);
  });

  it('is a wrapper which saves a factory and accepts another factory class as an argument', () => {
    // Given
    const factory = RestaurantFactory;
    const values = { name: "Rest'o'rant" };

    // When
    const subFactory = new SubFactory(RestaurantFactory, values);

    // Then
    expect(subFactory.factory).toBeInstanceOf(factory);
    expect(subFactory.values).toEqual(values);
  });
  it('throws if no dataSource is provided and factory expects one', () => {
    expect(() => new SubFactory(CookFactory)).toThrow(
      'No dataSource provided. You should either provide a default one or pass one in the constructor',
    );
  });

  it('instantiates the factory with the default dataSource if defined', () => {
    // Arrange: set a default dataSource
    const dummyDataSource = { foo: 'bar' } as any;
    const originalDataSource = getDefaultDataSource();
    setDefaultDataSource(dummyDataSource);

    // When
    const subFactory = new SubFactory(CookFactory);

    // Then
    expect(subFactory.factory).toBeInstanceOf(CookFactory);

    // Cleanup
    setDefaultDataSource(originalDataSource);
  });
});
