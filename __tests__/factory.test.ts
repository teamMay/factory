import { CookFactory } from './factories/cook.factory';
import { RestaurantFactory } from './factories/restaurant.factory';
import { Restaurant } from './entities/Restaurant';
import { Cook } from './entities/Cook';

describe('Factory with default adapter', () => {
  const restaurantFactory = new RestaurantFactory();
  const cookFactory = new CookFactory();

  describe('basic usage', () => {
    it('creates entity (not persisted) with default values when no attributes specified', async () => {
      // Given
      const values = {};

      // When
      const restaurant: Restaurant = await restaurantFactory.build(values);

      // Then
      expect(restaurant.id).toBeUndefined(); // not saved
      expect(restaurant.name).toEqual('Beau gosse Kebab');
      expect(restaurant.description).toEqual('Best kebab in Caen');
    });

    it('no persistance - entity created is same as built except for post actions', async () => {
      // Given
      const values = {};

      // When
      const createdRestaurant: Restaurant = await restaurantFactory.create(values);
      const { cooks, ...limitedRestaurant } = createdRestaurant;
      const builtRestaurant: Restaurant = await restaurantFactory.build(values);

      // Then
      expect(limitedRestaurant).toEqual(builtRestaurant);
      expect(cooks?.length !== 0).toBeTruthy();
    });

    it('creates entity and overrides values if provided', async () => {
      // Given
      const description = 'Best kebab thanks to its "Sauce magique Beau gosse"';
      const values = { description };

      // When
      const restaurant: Restaurant = await restaurantFactory.build(values);

      // Then
      expect(restaurant.description).toEqual(description);
    });

    it('builds many instances with buildMany and values', async () => {
      // Given
      const restaurantName = 'foooo';
      const values = { name: restaurantName };
      const restaurantTotal = 2;

      // When
      const restaurants = await restaurantFactory.buildMany(restaurantTotal, values);

      // Then
      expect(restaurants.length).toEqual(restaurantTotal);
      expect(restaurants[restaurantTotal - 1]).toBeInstanceOf(Restaurant);
      expect(restaurants[restaurantTotal - 1].name).toEqual(restaurantName);
    });

    it('builds many instances with buildMany without values', async () => {
      // Given
      const restaurantTotal = 2;

      // When
      const restaurants = await restaurantFactory.buildMany(restaurantTotal);

      // Then
      expect(restaurants.length).toEqual(restaurantTotal);
      expect(restaurants[restaurantTotal - 1]).toBeInstanceOf(Restaurant);
    });

    it('creates many instances with createMany (same as buildMany with ObjectAdapter)', async () => {
      // Given
      const values = {};
      const restaurantTotal = 3;

      // When
      const restaurants = await restaurantFactory.createMany(restaurantTotal, values);

      // Then
      expect(restaurants.length).toEqual(restaurantTotal);
      expect(restaurants[restaurantTotal - 1]).toBeInstanceOf(Restaurant);
      expect(restaurants[restaurantTotal - 1].cooks).toBeInstanceOf(Array);
    });
  });

  describe('Sequence', () => {
    it('Should increment sequence after every instance creation', async () => {
      // Given
      const cooks: Cook[] = await cookFactory.createMany(2);

      // Then
      cooks.forEach((cook: Cook, index: number) => {
        expect(cook.firstName).toEqual(`Gordon clone n°${index}`);
      });
    });
  });

  describe('Subfactory', () => {
    it('should built subfactories', async () => {
      // Given
      const values = {};

      // When
      const cook: Cook = await cookFactory.build(values);

      // Then
      expect(cook.restaurant).toBeInstanceOf(Restaurant);
    });
  });
});
