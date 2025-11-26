import { PostGeneration, SubFactory } from '../../src';
import { ObjectFactory } from '../../src/factories/objectFactory';
import { Cook } from '../entities/Cook';
import { Restaurant } from '../entities/Restaurant';
import { CookFactory } from './cook.factory';

const dummyFunction = () => true;

export class RestaurantFactory extends ObjectFactory<Restaurant> {
  attrs = { name: 'Beau gosse Kebab', open: true, description: 'Best kebab in Caen' };
  entity = Restaurant;

  @PostGeneration()
  async addCooks(restaurant: Restaurant) {
    restaurant.cooks = await new CookFactory().createMany(2, { restaurant });
  }

  @PostGeneration()
  postActionSync() {
    dummyFunction();
  }
}

interface Pizzeria {
  name: string;
}

interface PizzeriaWithChef extends Pizzeria {
  chef: Cook;
}

export class PizzeriaFactory extends ObjectFactory<Pizzeria> {
  attrs = { name: 'Great Name' };
}

export class PizzeriaWithChefFactory extends ObjectFactory<PizzeriaWithChef> {
  attrs = { name: 'Great Name', chef: new SubFactory<Cook>(CookFactory) };
}
