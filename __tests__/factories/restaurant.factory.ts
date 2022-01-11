import { Factory, PostGeneration } from '../../src';
import { Restaurant } from '../entities/Restaurant';
import { CookFactory } from './cook.factory';

const dummyFunction = () => true;

export class RestaurantFactory extends Factory<Restaurant> {
  entity = Restaurant;
  attrs = {
    name: 'Beau gosse Kebab',
    open: true,
    description: 'Best kebab in Caen',
  };

  @PostGeneration()
  async addCooks(restaurant: Restaurant) {
    restaurant.cooks = await new CookFactory().createMany(2, { restaurant });
  }

  @PostGeneration()
  postActionSync() {
    dummyFunction();
  }
}
