import { getRepository } from 'typeorm';
import sinon from 'sinon';
import { factoryStorage } from '../src';

// typeorm entities
import { Restaurant } from './typeormEntities/Restaurant';
import { Cook } from './typeormEntities/Cook';

// Example factories
import { RestaurantFactory } from './typeormFactories/restaurant.factory';
import { CookFactory } from './typeormFactories/cook.factory';

beforeAll(async () => {});

describe('Test Factory with typeorm', () => {
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

    it('persists entity to database with default values when no attribute', async () => {
      // Given
      const values = {};

      // When
      const restaurant: Restaurant = await restaurantFactory.create(values);
      const databaseEntity = await getRepository(Restaurant).findOne(restaurant.id);

      // Then
      expect(restaurant.id).toBeDefined();
      expect(databaseEntity).toBeDefined();
      expect(databaseEntity?.id).toEqual(restaurant.id);
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
  });

  describe('subFactories behavior', () => {
    it('creates entity with subfactory and saves both objects', async () => {
      // When
      // Given cookFactory uses a subFactory
      const cook: Cook = await cookFactory.create();

      // // Then
      expect(cook.id).toBeDefined();
      expect(cook.restaurant.id).toBeDefined();

      const restaurantEntity = await getRepository(Restaurant).findOne(cook.restaurant.id);
      expect(restaurantEntity).toBeDefined();

      const createdCook = await getRepository(Cook).findOne(cook.id, { relations: ['restaurant'] });
      expect(createdCook?.restaurant.id).toEqual(cook.restaurant.id);
    });

    it('createMany creates several entities and sub entities', async () => {
      // Given
      const cookSquadNumber = 2;
      const cooks: Cook[] = await cookFactory.createMany(cookSquadNumber);

      // When
      const totalCooks: number = await getRepository(Cook).count();
      const totalRestaurants = await getRepository(Restaurant).count();

      // Then
      expect(cooks.length).toEqual(cookSquadNumber);
      expect(totalRestaurants).toEqual(cookSquadNumber);
      expect(totalCooks).toEqual(cookSquadNumber + 6); // each restaurant factory generate 3 cooks
    });

    it('creates several entities but a single sub entity with createMany and an attribute used for the relation', async () => {
      // Given
      const cookSquadNumber = 2;
      const restaurant = await restaurantFactory.create();
      const cooks: Cook[] = await cookFactory.createMany(cookSquadNumber, { restaurant });

      // When
      const totalCooks: number = await getRepository(Cook).count();
      const totalRestaurants = await getRepository(Restaurant).count();

      // Then
      expect(cooks.length).toEqual(cookSquadNumber);
      expect(totalRestaurants).toEqual(1);
      expect(totalCooks).toEqual(cookSquadNumber + 3); // each restaurant factory generate 3 cooks
    });
  });

  it('calls post generators after entity creation', async () => {
    // Given
    const addCooksSpy = sinon.spy(restaurantFactory, 'addCooks');

    // When
    const restaurant = await restaurantFactory.create();

    // then
    expect(addCooksSpy.calledOnce).toBeTruthy();
    expect(factoryStorage.getPostGenerators(restaurantFactory.constructor.name).size).toEqual(1);
    expect(restaurant.cooks.length).toEqual(3);
  });
});
