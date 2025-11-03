import sinon from 'sinon';
import { factoryStorage } from '../src';

// payload collections
import type { TypedCollection, Payload } from 'payload';

// Example factories
import { RestaurantFactory } from './payloadFactories/restaurant.factory';
import { CookFactory } from './payloadFactories/cook.factory';
import { CookCollection } from './payloadCollections/Cook';
import { RestaurantCollection } from './payloadCollections/Restaurant';

import { buildConfig, getPayload } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';

describe('Test Factory with payload', () => {
  let payload: Payload;
  let restaurantFactory: RestaurantFactory;
  let cookFactory: CookFactory;

  beforeAll(async () => {
    const payloadConfig = buildConfig({
      db: sqliteAdapter({
        client: {
          url: ':memory:',
        },
      }),
      secret: 'secret',
      collections: [CookCollection, RestaurantCollection],
    });

    payload = await getPayload({ config: payloadConfig });
    restaurantFactory = new RestaurantFactory(payload);
    cookFactory = new CookFactory(payload);
  });

  beforeEach(async () => {
    await payload.db.drizzle.run(`delete from restaurant`);
    await payload.db.drizzle.run(`delete from cook`);
  });

  describe('argument payload', () => {
    describe('payload usage', () => {
      it('Factory requires payload to be provided in constructor', () => {
        // PayloadFactory always requires payload (unlike TypeORM which can use default)
        // This is enforced at TypeScript level and runtime
        const factory = new RestaurantFactory(payload);
        expect(factory).toBeDefined();
        expect(factory['payload']).toBeDefined();
      });
    });

    describe('basic usage', () => {
      it('creates entity (not persisted) with default values when no attributes specified', async () => {
        // Given
        const values = {};

        // When
        const restaurant: TypedCollection['restaurant'] = await restaurantFactory.build(values);

        // Then
        expect(restaurant.id).toBeUndefined(); // not saved
        expect(restaurant.name).toEqual('Beau gosse Kebab');
        expect(restaurant.description).toEqual('Best kebab in Caen');
      });

      it('persists entity to database with default values when no attribute', async () => {
        // Given
        const values = {};

        // When
        const restaurant: TypedCollection['restaurant'] = await restaurantFactory.create(values);
        const databaseEntity = await payload.find({
          collection: 'restaurant',
          where: { id: { equals: restaurant.id } },
        });

        // Then
        expect(restaurant.id).toBeDefined();
        expect(databaseEntity.docs).toBeDefined();
        expect(databaseEntity.docs.length).toBeGreaterThan(0);
        expect(databaseEntity.docs[0]?.id).toEqual(restaurant.id);
      });

      it('creates entity and overrides values if provided', async () => {
        // Given
        const description = 'Best kebab thanks to its "Sauce magique Beau gosse"';
        const values = { description };

        // When
        const restaurant: TypedCollection['restaurant'] = await restaurantFactory.build(values);

        // Then
        expect(restaurant.description).toEqual(description);
      });
    });

    describe('subFactories behavior', () => {
      it('creates entity with subfactory and saves both objects', async () => {
        // When
        // Given cookFactory uses a subFactory
        const cook: TypedCollection['cook'] = await cookFactory.create();

        // Then
        expect(cook.id).toBeDefined();
        expect(cook.restaurant).toBeDefined();
        // In Payload, relationships can be just IDs or the full object depending on depth
        const restaurantId = typeof cook.restaurant === 'object' ? cook.restaurant.id : cook.restaurant;
        expect(restaurantId).toBeDefined();

        const restaurantEntity = await payload.find({
          collection: 'restaurant',
          where: { id: { equals: restaurantId } },
        });
        expect(restaurantEntity.docs.length).toBeGreaterThan(0);

        const createdCook = await payload.find({
          collection: 'cook',
          where: { id: { equals: cook.id } },
          depth: 1,
        });
        expect(createdCook.docs.length).toBeGreaterThan(0);
        const cookRestaurantId =
          typeof createdCook.docs[0]?.restaurant === 'object'
            ? createdCook.docs[0]?.restaurant?.id
            : createdCook.docs[0]?.restaurant;
        expect(cookRestaurantId).toEqual(restaurantId);
      });

      it('createMany creates several entities and sub entities', async () => {
        // Given

        const cookSquadNumber = 2;
        const cooks: TypedCollection['cook'][] = await cookFactory.createMany(cookSquadNumber);

        // When
        const totalCooks = await payload.find({ collection: 'cook' });
        const totalRestaurants = await payload.find({ collection: 'restaurant' });

        // Then
        expect(cooks.length).toEqual(cookSquadNumber);
        expect(totalRestaurants.totalDocs).toEqual(cookSquadNumber);
        expect(totalCooks.totalDocs).toEqual(cookSquadNumber + 6); // each restaurant factory generate 3 cooks
      });

      it('creates several entities but a single sub entity with createMany and an attribute used for the relation', async () => {
        // Given
        const cookSquadNumber = 2;
        const restaurant = await restaurantFactory.create();
        const cooks: TypedCollection['cook'][] = await cookFactory.createMany(cookSquadNumber, {
          restaurant: restaurant.id,
        });

        // When
        const totalCooks = await payload.find({ collection: 'cook' });
        const totalRestaurants = await payload.find({ collection: 'restaurant' });

        // Then
        expect(cooks.length).toEqual(cookSquadNumber);
        expect(totalRestaurants.totalDocs).toEqual(1);
        expect(totalCooks.totalDocs).toEqual(cookSquadNumber + 3); // each restaurant factory generate 3 cooks
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
      // In Payload, relationships are stored as IDs, so we verify that the cooks were created in the database
      const cooks = await payload.find({
        collection: 'cook',
        where: { restaurant: { equals: restaurant.id } },
      });
      expect(cooks.totalDocs).toEqual(3);
    });
  });
});
