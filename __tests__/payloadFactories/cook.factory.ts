import { PayloadFactory, SubFactory } from '../../src';
import { RestaurantFactory } from './restaurant.factory';
import type { Payload } from 'payload';

class EmptyClass {}

export class CookFactory extends PayloadFactory<'cook'> {
  constructor(payloadInstance: Payload) {
    super(payloadInstance, 'cook');
  }

  attrs = {
    firstName: () => 'Gordon',
    lastName: 'Ramsay',
    restaurant: new SubFactory(new RestaurantFactory(this.payload)),
  };
}
