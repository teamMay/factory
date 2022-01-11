import { Factory, PostGeneration } from '../../src';
import { TypeormAdapter } from '../../src/adapters';
import { Restaurant } from '../typeormEntities/Restaurant';
import { CookFactory } from './cook.factory';

export class RestaurantFactory extends Factory<Restaurant> {
  entity = Restaurant;
  attrs = {
    name: 'Beau gosse Kebab',
    open: true,
    description: 'Best kebab in Caen',
  };
  adapter = new TypeormAdapter();

  @PostGeneration()
  async addCooks(restaurant: Restaurant) {
    restaurant.cooks = await new CookFactory().createMany(3, { restaurant });
  }
}
