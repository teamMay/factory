import { Factory, LazySequence, LazyAttribute, Sequence, SubFactory } from '../../src';
import { ObjectFactory } from '../../src/factories/objectFactory';
import { Cook } from '../entities/Cook';
import { RestaurantFactory } from './restaurant.factory';

export class CookFactory extends ObjectFactory<Cook> {
  entity = Cook;
  attrs = {
    firstName: new Sequence((nb) => `Gordon clone n°${nb}`),
    lastName: 'Ramsay',
    mail: () => `${this.attrs.lastName}@email-fake.com`,
    restaurant: new SubFactory(new RestaurantFactory()),
  };
}

export class LazyCookFactory extends ObjectFactory<Cook> {
  entity = Cook;
  attrs = {
    firstName: new Sequence((nb) => `Gordon${nb}`),
    lastName: 'Ramsay',
    mail: new LazyAttribute((instance: Cook) => `${instance.firstName}@yumyum.com`),
    restaurant: new SubFactory(new RestaurantFactory(), { name: 'Starbucks' }),
  };
}

export class LazySequenceCookFactory extends ObjectFactory<Cook> {
  entity = Cook;
  attrs = {
    firstName: 'Gordon',
    lastName: 'Ramsay',
    mail: new LazySequence((nb: number, instance: Cook) => `${instance.firstName}${nb}@yummy.com`),
    restaurant: new SubFactory(new RestaurantFactory(), { name: 'Starbucks' }),
  };
}
