import { SubFactory } from '../src';
import { RestaurantFactory } from './factories/restaurant.factory';

describe('SubFactory', () => {
  it('is a wrapper which saves a factory and values to be overriden', () => {
    // Given
    const factory = RestaurantFactory;
    const values = { name: "Rest'o'rant" };

    // When
    const subFactory = new SubFactory(factory, values);

    // Then
    expect(subFactory.factory).toBeInstanceOf(factory);
    expect(subFactory.values).toEqual(values);
  });
});
