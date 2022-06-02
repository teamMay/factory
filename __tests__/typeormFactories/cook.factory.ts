import { TypeormFactory, SubFactory } from '../../src';
import { Cook } from '../typeormEntities/Cook';
import { RestaurantFactory } from './restaurant.factory';

export class CookFactory extends TypeormFactory<Cook> {
  entity = Cook;
  attrs = {
    firstName: () => 'Gordon',
    lastName: 'Ramsay',
    restaurant: new SubFactory(new RestaurantFactory(this.dataSource)),
  };
}
