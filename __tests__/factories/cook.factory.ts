import { Factory, Sequence, SubFactory } from '../../src';
import { Cook } from '../entities/Cook';
import { RestaurantFactory } from './restaurant.factory';

export class CookFactory extends Factory<Cook> {
  entity = Cook;
  attrs = {
    firstName: new Sequence((nb) => `Gordon clone n°${nb}`),
    lastName: 'Ramsay',
    mail: () => `${this.attrs.lastName}@email-fake.com`,
    restaurant: new SubFactory(RestaurantFactory),
  };
}
