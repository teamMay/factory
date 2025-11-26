import { ObjectFactory } from '../../src/factories/objectFactory';
import { Town } from '../entities/Town';

export class TownFactory extends ObjectFactory<Town> {
  entity = Town;
  attrs = {
    name: () => 'Little Rock',
    // description is voluntarily not included
  };
}
