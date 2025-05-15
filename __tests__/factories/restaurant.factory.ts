import { Factory, PostGeneration, SubFactory } from '../../src';
import { Cook } from '../entities/Cook';
import { Restaurant } from '../entities/Restaurant';
import { CookFactory } from './cook.factory';

const dummyFunction = () => true;

export class RestaurantFactory extends Factory<Restaurant> {
  entity = Restaurant;
  attrs = { name: 'Beau gosse Kebab', open: true, description: 'Best kebab in Caen' };

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

export class PizzeriaFactory extends Factory<Pizzeria> {
  attrs = { name: 'Great Name' };
}

export class PizzeriaWithChefFactory extends Factory<PizzeriaWithChef> {
  attrs = { name: 'Great Name', chef: new SubFactory(CookFactory) };
}
