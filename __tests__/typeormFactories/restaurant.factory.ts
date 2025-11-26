import { PostGeneration, TypeormFactory } from '../../src';
import { Restaurant } from '../typeormEntities/Restaurant';
import { CookFactory } from './cook.factory';

export class RestaurantFactory extends TypeormFactory<Restaurant> {
  entity = Restaurant;
  attrs = {
    name: 'Beau gosse Kebab',
    open: true,
    description: 'Best kebab in Caen',
  };

  @PostGeneration()
  async addCooks(restaurant: Restaurant) {
    restaurant.cooks = await new CookFactory(this.dataSource).createMany(3, { restaurant });
  }
}
