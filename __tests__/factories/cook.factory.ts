import { Factory, LazySequence, LazyAttribute, Sequence, SubFactory } from '../../src';
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

export class LazyCookFactory extends Factory<Cook> {
  entity = Cook;
  attrs = {
    firstName: new Sequence((nb) => `Gordon${nb}`),
    lastName: 'Ramsay',
    mail: new LazyAttribute((instance: Cook) => `${instance.firstName}@yumyum.com`),
    restaurant: new SubFactory(RestaurantFactory, { name: 'Starbucks' }),
  };
}

export class LazySequenceCookFactory extends Factory<Cook> {
  entity = Cook;
  attrs = {
    firstName: 'Gordon',
    lastName: 'Ramsay',
    mail: new LazySequence((nb: number, instance: Cook) => `${instance.firstName}${nb}@yummy.com`),
    restaurant: new SubFactory(RestaurantFactory, { name: 'Starbucks' }),
  };
}
