import { PayloadFactory, PostGeneration } from '../../src';
import { CookFactory } from './cook.factory';
import type { TypedCollection, Payload } from 'payload';

class EmptyClass {}

export class RestaurantFactory extends PayloadFactory<'restaurant'> {
  protected entity = EmptyClass as any;

  constructor(payloadInstance: Payload) {
    super(payloadInstance, 'restaurant');
  }

  attrs = {
    name: 'Beau gosse Kebab',
    open: true,
    description: 'Best kebab in Caen',
  };

  @PostGeneration()
  async addCooks(restaurant: TypedCollection['restaurant']) {
    await new CookFactory(this.payload).createMany(3, { restaurant: restaurant.id });
  }
}
