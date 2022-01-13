import { Factory } from '../../src';
import { Town } from '../entities/Town';

export class TownFactory extends Factory<Town> {
  entity = Town;
  attrs = {
    name: () => 'Little Rock',
    // description is voluntarily not included
  };
}
