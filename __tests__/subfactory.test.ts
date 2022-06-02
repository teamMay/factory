import { SubFactory } from '../src';
import { RestaurantFactory } from './factories/restaurant.factory';

describe('SubFactory', () => {
  it('is a wrapper which saves a factory and values to be overriden', () => {
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
});
